import {Component, Inject, QueryList, ViewChildren} from '@angular/core';
import {UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {ApiService} from "../../services/api.service";
import {lastValueFrom} from "rxjs";
import {FileUpload} from "primeng/fileupload";
import {ConfirmationService} from "primeng/api";
import {browserRefresh} from "../../../../../app.component";
import {HandleValidatorsRequestAccessHelper} from "../../helpers/handle-validators-request-access-helper";
import {environment} from "../../../../../../environments/environment";
import {RequestAccessOutModel} from "../../model/request-access-document.model";
import {FileHelper} from "../../../../../shared/helpers/file.helper";
import {IDocument64} from "../../../../../shared/interfaces/i-document64";
import {LoaderService} from "../../../../../shared/services/loader";
import {DocumentResponseDto} from "../../../../../shared/models/group-response.dto";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-request-access-3-page',
    templateUrl: './request-access-3-page.component.html',
    styleUrl: './request-access-3-page.component.scss',
    providers: [ConfirmationService]
})
export class RequestAccessPage3Component {

    documents: DocumentResponseDto[] = [];

    public documentResponseDto = (documentResponseDto: DocumentResponseDto) => documentResponseDto;

    getDocumentLoaderId = 'get-documents-id';
    saveLoaderId = 'save-loader-id';

    @ViewChildren('fileUpload') fileUploads: QueryList<FileUpload>;

    readonly indexPage: string = '/auth/request-access/email';
    readonly previousPage: string = '/auth/request-access/steps/2';

    constructor(
        private router: Router,
        private log: NGXLogger,
        public loaderService: LoaderService,
        private service: ApiService,
        private confirmationService: ConfirmationService,
        @Inject('CHECKOUT_FORM_TOKEN') public form: UntypedFormGroup
    ) {
    }

    async ngOnInit() {
        if (browserRefresh && environment.refresh) {
            this.log.debug('Refreshing browser, navigating to checkout prices.');
            await this.router.navigate([this.indexPage]);
        }

        HandleValidatorsRequestAccessHelper.clearAll(this.form);

        this.documents = await this.loaderService.activateLoader(
            () => lastValueFrom(this.service.getDocuments().pipe(map(value => value.documents))),
            this.getDocumentLoaderId
        );
    }

    async previous() {
        await this.router.navigate([this.previousPage])
    }

    // update
    async save() {
        const allDocumentsSize = this.documents.length;
        const allDocumentsSentSize = this.form['controls']['documents'].value.length;

        if (allDocumentsSize !== allDocumentsSentSize) {
            throw Error('Por favor, sube todos los archivos enumerados para continuar.');
        }

        this.log.info('final form: ', this.form.getRawValue());
        const request: RequestAccessOutModel = this.form.getRawValue();

        await this.loaderService.activateLoader(
            () => lastValueFrom(this.service.save(request)),
            this.saveLoaderId
        );

        await this.router.navigate(['/auth/request-access/success']);
    }

    async upload(id: any, fileUpload: FileUpload) {
        const file = fileUpload.files[0];

        if (this.isValidDocument(file) === false) {
            await this.uploadFile(file, id);
        } else {

            let message = 'Parece que el archivo ya fue enviado, ¿deseas continuar de todos modos?';

            this.confirmationService.confirm({
                message: message,
                header: 'Advertencia',
                icon: 'pi pi-exclamation-triangle',
                acceptIcon: "Sí",
                rejectIcon: "No",
                rejectButtonStyleClass: "p-button-text",
                accept: () => {
                    this.uploadFile(file, id);
                },
                reject: () => {
                    fileUpload.clear();
                }
            });
        }
    }

    async uploadFile(file: File, id: any) {
        let currentValues = this.getCurrentDocumentsValue();
        const url = URL.createObjectURL(file);
        const fileBase64 = await FileHelper.toBase64(file);

        currentValues = [
            ...currentValues,
            {
                id: id,
                name: file?.name || '',
                url: url,
                file: fileBase64,
                contentType: file.type,
                fileObject: file,
            }
        ];

        this.form.patchValue({documents: currentValues});
    }
    getDocumentLabel(documentResponseDto: DocumentResponseDto) {
        return documentResponseDto.name + (documentResponseDto.description ? ': ' + documentResponseDto.description : '');
    }
    clearFileUpload(fileUpload: any, id: any) {
        fileUpload.clear();
        this.remove(id);
    }

    remove(id: any) {
        const currentValue = this.form.get('documents').value;
        const updatedValue = currentValue.filter((item: { id: any; }) => item.id !== id);

        // Update the value of 'documents' control
        this.form.patchValue({documents: updatedValue});
    }

    isValidDocument(file: File): boolean {
        const currentFilesValue = this.getCurrentDocumentsValue().map(value => value.fileObject);
        return FileHelper.isTheSameFiles(file, currentFilesValue);
    }

    download(id: any) {
        const currentValues: any[] = this.getCurrentDocumentsValue();
        const url = currentValues.filter(value => value.id === id)[0]?.url;
        window.open(url, '_blank');
    }

    getCurrentDocumentsValue(): IDocument64[] {
        return this.form['controls']['documents'].value
    }

    downloadFile(): void {
        // Path to the file in the assets folder
        const filePath = '/assets/documents/Declaración de confidencialidad - GIRO.docx';

        // Constructing the full URL to the file
        const fileUrl = location.origin + filePath;

        // Creating a link element
        const link = document.createElement('a');
        link.href = fileUrl;

        // Setting the download attribute and file name
        link.download = 'myfile.txt';

        // Triggering the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    }

}
