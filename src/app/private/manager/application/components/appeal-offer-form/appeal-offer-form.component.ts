import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {GiroUploadComponent} from "../../../../../shared/components/upload/giro-upload.component";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {NgForOf} from "@angular/common";
import {GroupResponseDto} from "../../../../../shared/models/group-response.dto";
import {ApplicationCreateDto} from "../../../bidding/models/application-create.dto";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../../../shared/components/app-view-data/app-view-data.component";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
    selector: 'app-appeal-offer-form',
    templateUrl: './appeal-offer-form.component.html',
    standalone: true,
    imports: [
        GiroUploadComponent,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        DividerModule,
        ButtonModule,
        NgForOf,
        GiroDataViewComponent,
        AppViewDataComponent
    ],
    styleUrl: './appeal-offer-form.component.scss'
})
export class AppealOfferFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<ApplicationCreateDto> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() buttonIsLoading: boolean;

    documents: any = [];

    @Input()
    organizationId: string;

    @Input()
    input: GroupResponseDto;

    @Input()
    code: string;

    @Input()
    evaluationDate: string;

    @Input()
    refuseReason: string;

    constructor(public config: DynamicDialogConfig, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({});
        this.input.documents.forEach(document => {
            this.form.addControl(document.id, new FormControl(null))
        });
    }

    save() {
        const files = this.form.getRawValue();

        const giroFiles: any[] = Object.keys(files)
            .filter(value => files[value])
            .flatMap(value => {
                return files[value].flatMap((f: any) => {
                    return {
                        ...f,
                        id: value,
                    }
                });
            });

        if (giroFiles.length === 0) {
            throw new Error('Al menos debe subirse un archivo.')
        }

        this.saveEvent.emit( this.getOutModel(giroFiles) );
    }

    getOutModel(giroFiles: any[]): ApplicationCreateDto {

        // convert all the ApplicationOutModel
        const documents = giroFiles.map((giroFile, index) => {
            const document = this.input.documents.filter(d => d.id === giroFile.id)[0];
            return {
                id: document.id,
                name: giroFile.name,
                contentType: giroFile.contentType,
                file: giroFile.file
            }
        });

        return {
            organizationId: this.organizationId,
            documents: documents
        };
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }
}
