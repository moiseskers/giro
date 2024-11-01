import {EventEmitter, Injectable} from '@angular/core';
import {NgForm} from '@angular/forms';
import moment from 'moment/moment';
import {Table} from 'primeng/table';
import {lastValueFrom, Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {DeclarationItemTypeEnum} from '../../../shared/enums/declaration-item-type.enum';
import {DeclarationRequestRecurrence} from '../../../shared/enums/declaration-request-recurrence';
import {DeclarationTableFormType} from '../../../shared/enums/declaration-table-form-type';
import {DeclarationType} from '../../../shared/enums/declaration-type';
import {GeneralHelper} from '../../../shared/helpers/general-helper';
import {UuidHelper} from '../../../shared/helpers/uuid-helper';
import {DeclarationItemResponseDto} from '../../../shared/models/declaration-item-response.dto';
import {DeclarationResponseDto} from '../../../shared/models/declaration-response.dto';
import {LeadsMaterialResponseDto, LeadsResponseDto} from '../../../shared/models/leads-response.dto';
import {LoaderService} from '../../../shared/services/loader';
import {LeadsService} from './leads.service';
import {NGXLogger} from 'ngx-logger';
import {CategoryType} from '../../../shared/types/category.type';


@Injectable({
    providedIn: 'root'
})
export class DeclarationTableFormService {

    categories: LeadsResponseDto[][] = [];
    subcategories: LeadsResponseDto[][] = [];
    materials: LeadsMaterialResponseDto[][] = [];

    declarationItemTypes: any[][] = [];
    declarationResponseDtoRef: DeclarationResponseDto;

    categoryLoaderId: string[] = [];
    subCategoryLoaderId: string[] = [];
    materialLoaderId: string[] = [];

    // refer to the 3 views    MONTHLY_CONSOLIDATED, MONTHLY_DETAILED, ANNUALLY,
    declarationTableFormType: DeclarationTableFormType = GeneralHelper.getKeyByValue(DeclarationTableFormType, DeclarationTableFormType.ANNUALLY);

    // on after init, set it
    scrollContainer: Table;
    displayTable: boolean;
    saveEvent: EventEmitter<any> = new EventEmitter<any>();
    isAddNewRowLoading: boolean = false;

    isBackyard: boolean = false;
    producerType: CategoryType;

    constructor(
        private log: NGXLogger,
        private leadsService: LeadsService, private loaderService: LoaderService) {


    }

    //####START UP HELPER START####################################################################################################
    async startUpHelper() {
        this.producerTypeCheck();

        if (GeneralHelper.isEmptyOrUndefinedOrNull(this.declarationResponseDtoRef?.items)) {
            this.declarationResponseDtoRef.items = []
        }

        const promises = this.declarationResponseDtoRef.items.map(async (value, rowIndex) => {
            value.businessEndDate =  value?.businessEndDate ? moment(value.businessEndDate).toDate()  : null;
            value.operationEndDate = value?.operationEndDate ? moment(value.operationEndDate).toDate()  : null;
            await this.start(value.category, value.subcategoryId, value.materialId, rowIndex);
            return value;
        });
        await Promise.all(promises);
    }

    async start(
        categoryId: string,
        subcategoryId: string,
        materialId: string,
        rowIndex: number,
    ) {
        this.categories[rowIndex] = await this.loaderService.activateLoader(
            () => lastValueFrom(this.getCategories()),
            this.categoryLoaderId[rowIndex]
        );

        this.subcategories[rowIndex] = await this.loaderService.activateLoader(
            () => lastValueFrom(this.getSubcategories(categoryId)),
            this.subCategoryLoaderId[rowIndex]
        );

        this.materials[rowIndex] = await this.loaderService.activateLoader(
            () => lastValueFrom(this.getMaterials(categoryId, subcategoryId)),
            this.subCategoryLoaderId[rowIndex]
        );

        const material = this.materials[rowIndex].filter(material => material.id === materialId)[0];

        this.declarationItemTypeHelper(material, rowIndex);
    }
    //####START UP HELPER END####################################################################################################


    //####INPUT CHANGES START####################################################################################################
    async categoryNgModelChange($event: any, rowIndex: number) {
        // initialize subCategories
        this.subCategoryLoaderId[rowIndex] = UuidHelper.get();

        this.subcategories[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getSubcategories($event)), this.subCategoryLoaderId[rowIndex]));

        this.resetSubCategoryValueHelper(rowIndex);

        // materials
        this.materialLoaderId[rowIndex] = UuidHelper.get();
        this.materials[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getMaterials($event, this.subcategories[rowIndex][0]?.id)), this.materialLoaderId[rowIndex]));

        this.resetMaterialValueHelper(rowIndex);

        const material = this.materials[rowIndex].filter((material: { id: string; }) => material.id === this.declarationResponseDtoRef.items[rowIndex].materialId)[0];

        this.declarationItemTypeHelper(material, rowIndex);

        this.resetDeclarationItemTypeHelper(rowIndex);
    }

    async subcategoryNgModelChange($event: any, rowIndex: number) {
        // initialize materials
        this.materialLoaderId[rowIndex] = UuidHelper.get();

        const categoryId = this.declarationResponseDtoRef.items[rowIndex].category;

        this.materials[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getMaterials(categoryId, $event)), this.materialLoaderId[rowIndex]));

        this.resetMaterialValueHelper(rowIndex);

        const material = this.materials[rowIndex].filter(material => material.id === this.declarationResponseDtoRef.items[rowIndex].materialId)[0];

        this.declarationItemTypeHelper(material, rowIndex);

        this.resetDeclarationItemTypeHelper(rowIndex);
    }

    materialNgModelChange($event: any, rowIndex: number) {
        const material = this.materials[rowIndex].filter(material => material.id === $event)[0];
        this.declarationItemTypeHelper(material, rowIndex);
        this.resetDeclarationItemTypeHelper(rowIndex);
    }

    typeNgModelChange($event: any) {
        this.declarationTableFormType = this.getDeclarationTableFormType($event);
        this.declarationResponseDtoRef.items = []
    }
    //####INPUT CHANGES END###################################################################################################


    //####ROWS START###################################################################################################
    async addNewRow() {
        this.isAddNewRowLoading = true;

        const rowIndex = this.declarationResponseDtoRef.items.length;

        if (this.isBackyard) {
            await this.startAddNewRowBackyard(rowIndex);
        } else {
            await this.startAddNewRow(rowIndex);
        }

        const item = new DeclarationItemResponseDto();
        this.declarationResponseDtoRef.items.push(item);

        if (this.isBackyard) {
            item.category =        'NON_DOMICILIARY';
        } else {
            item.category =        this.categories[rowIndex][0].id;
        }

        item.subcategoryId =       this.subcategories[rowIndex][0].id;
        item.declarationItemType = this.declarationItemTypes[rowIndex][0]?.value;

        if (this.declarationTableFormType !== DeclarationTableFormType.MONTHLY_DETAILED) {
            item.materialId = this.materials[rowIndex][0].id;
        }

        this.scrollToBeginningHelper();

        this.isAddNewRowLoading = false;
    }

    async startAddNewRow(rowIndex: number) {
        this.categories[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getCategories()), this.categoryLoaderId[rowIndex]));
        this.subcategories[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getSubcategories(this.categories[rowIndex][0].id)), this.subCategoryLoaderId[rowIndex]));
        this.materials[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getMaterials(this.categories[rowIndex][0].id, this.subcategories[rowIndex][0].id)), this.subCategoryLoaderId[rowIndex]));
        const material = this.materials[rowIndex][0];
        this.declarationItemTypeHelper(material, rowIndex);
    }

    async startAddNewRowBackyard(rowIndex: number) {
        this.categories[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getCategories()), this.categoryLoaderId[rowIndex]));
        this.subcategories[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getSubcategories('NON_DOMICILIARY')), this.subCategoryLoaderId[rowIndex]));
        this.materials[rowIndex] = (await this.loaderService.activateLoader(() => lastValueFrom(this.getMaterials(this.categories[rowIndex][0].id, this.subcategories[rowIndex][0].id)), this.subCategoryLoaderId[rowIndex]));
        const material = this.materials[rowIndex][0];
        this.declarationItemTypeHelper(material, rowIndex);
    }

    removeRow(index: number): void {
        const length = this.declarationResponseDtoRef.items.length;

        if (length < 2) {
            this.displayTable = false;
        }

        if (index >= 0 && index < length) {
            this.declarationResponseDtoRef.items.splice(index, 1);
        }

        setTimeout(() => this.displayTable = true, 100);
    }
    //####ROWS END###################################################################################################

    //####FORM START###############################################################################################################
    save(f: NgForm) {
        if (this.declarationResponseDtoRef.items.length === 0) {
            throw new Error('Al menos una fila debe ser agregada.!')
        }

        if (f.form.invalid) {
            this.markAllAsTouchedHelper(f);
        }

        this.saveEvent.emit(this.declarationResponseDtoRef);
    }
    //####FORM END###############################################################################################################

    //####SUM START###############################################################################################################
    get totalQuantitySum() {
        return this.declarationResponseDtoRef?.items?.map(value => value?.quantity || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
    }

    get totalTons() {
        return this.declarationResponseDtoRef?.items?.map(value => value?.tons || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
    }

    get totalCost() {
        return this.declarationResponseDtoRef?.items?.map(value => value?.materialCost || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
    }
    //####SUM START###############################################################################################################


    //####HELPERS START###############################################################################################################
    public markAllAsTouchedHelper(f: any): void {
        Object.keys(f.form.controls).forEach(key => {
            f.form.controls[key].markAllAsTouched()
            f.form.controls[key].markAsDirty()
        });
    }

    private resetMaterialValueHelper(rowIndex: number) {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(this.materials[rowIndex])) {
            this.declarationResponseDtoRef.items[rowIndex].materialId = this.materials[rowIndex][0].id;
        }
    }

    resetSubCategoryValueHelper(rowIndex: number) {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(this.subcategories[rowIndex])) {
            this.declarationResponseDtoRef.items[rowIndex].subcategoryId = this.subcategories[rowIndex][0].id;
        }
    }

    private resetDeclarationItemTypeHelper(rowIndex: number) {
        this.declarationResponseDtoRef.items[rowIndex].declarationItemType = this.declarationItemTypes[rowIndex][0]?.value;
    }

    declarationItemTypeHelper(leadsResponseDto: LeadsMaterialResponseDto, index: number) {
        this.declarationItemTypes[index] = []

        if (leadsResponseDto.withoutFat) {
            this.declarationItemTypes[index].push({
                key: DeclarationItemTypeEnum.WITHOUT_FAT,
                value: GeneralHelper.getKeyByValue(DeclarationItemTypeEnum, DeclarationItemTypeEnum.WITHOUT_FAT)
            });
        }

        if (leadsResponseDto.withFat) {
            this.declarationItemTypes[index].push({
                key: DeclarationItemTypeEnum.WITH_FAT,
                value: GeneralHelper.getKeyByValue(DeclarationItemTypeEnum, DeclarationItemTypeEnum.WITH_FAT)
            });
        }

        if (leadsResponseDto.dangerous) {
            this.declarationItemTypes[index].push({
                key: DeclarationItemTypeEnum.DANGEROUS,
                value: GeneralHelper.getKeyByValue(DeclarationItemTypeEnum, DeclarationItemTypeEnum.DANGEROUS)
            });
        }
    }

    scrollToBeginningHelper(): void {
        if (this.scrollContainer) {
            this.scrollContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    getDeclarationTableFormType($event: any): DeclarationTableFormType {
        const declarationRequestType = DeclarationRequestRecurrence[$event];
        const declarationType = DeclarationType[$event];

        if (DeclarationRequestRecurrence.ANNUAL === declarationRequestType) {
            return DeclarationTableFormType.ANNUALLY;
        }

        if (DeclarationType.CONSOLIDATED === declarationType) {
            return DeclarationTableFormType.MONTHLY_CONSOLIDATED;
        }

        if (DeclarationType.DETAILED === declarationType) {
            return DeclarationTableFormType.MONTHLY_DETAILED;
        }

        return null;
    }

    disableDropDownHelper(rowIndex: number): boolean {
        return this.loaderService.loading[this.subCategoryLoaderId[rowIndex]]
            || this.loaderService.loading[this.materialLoaderId[rowIndex]];
    }
    //####HELPERS END###############################################################################################################

    //####FROM SERVICES START###############################################################################################################
    private getCategories(): Observable<LeadsResponseDto[]> {
        return this.leadsService.categories().pipe(
            map(category => {
                return category.items.filter(item => {
                    if (this.producerType === 'DOMICILIARY') {
                        return item.id === 'DOMICILIARY';
                    } else if (this.producerType === 'NON_DOMICILIARY') {
                        return item.id === 'NON_DOMICILIARY';
                    } else if (this.producerType === 'BOTH') {
                        return true;
                    }
                    return false;
                });
            })
        );
    }

    private getSubcategories(categoryId: string): Observable<LeadsResponseDto[]> {
        try {
            return this.leadsService.subcategories(categoryId).pipe(map(subcategory => subcategory.items));
        } catch (e) {
            return of([])
        }
    }

    private getMaterials(categoryId: string, subcategoryId: string): Observable<LeadsMaterialResponseDto[]> {
        try {
            return this.leadsService.materialsBySubCategoryId(categoryId, subcategoryId).pipe(map(material => material.items));
        } catch (e) {
            return of([])
        }
    }
    //####FROM SERVICES END###############################################################################################################

    producerTypeCheck () {
        if (!this.producerType) {
            throw new Error('The producer type is null!');
        }
    }

    get isThereSomethingLoading(): boolean {
        const isAnyLoaderActive = (x: string | number) => {
            return [
                this.loaderService.loading[this.categoryLoaderId[x]],
                this.loaderService.loading[this.subCategoryLoaderId[x]],
                this.loaderService.loading[this.materialLoaderId[x]]
            ].some(loader => loader === true);
        };
        if (this.declarationResponseDtoRef?.items) {
            for (let index = 0; index < this.declarationResponseDtoRef.items.length; index++) {
                if (isAnyLoaderActive(index)) {
                    return true;
                }
            }
        }
        return false;
    }

}
