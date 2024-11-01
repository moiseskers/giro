import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BiddingDocumentResponseDto} from "../../../../../shared/models/bidding-document-response.dto";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {GiroUploadComponent} from "../../../../../shared/components/upload/giro-upload.component";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {NgForOf} from "@angular/common";
import {ApplicationCreateDto} from "../../models/application-create.dto";
import {GroupResponseDto} from "../../../../../shared/models/group-response.dto";

@Component({
    selector: 'app-submit-offer-form',
    templateUrl: './submit-offer-form.component.html',
    standalone: true,
    imports: [
        GiroUploadComponent,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        DividerModule,
        ButtonModule,
        NgForOf
    ],
    styleUrl: './submit-offer-form.component.scss'
})
export class SubmitOfferFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<ApplicationCreateDto> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: BiddingDocumentResponseDto;
    @Input() buttonIsLoading: boolean;

    documents: any = [];

    @Input()
    organizationId: string;

    @Input()
    input: GroupResponseDto;

    constructor(
        private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({});
        this.input.documents.forEach(document => {
            this.form.addControl(document.id, new FormControl('', [Validators.required]))
        });
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        if (this.form.invalid) {
            throw new Error('Todos los archivos deben ser subidos antes de continuar.')
        }

        this.saveEvent.emit( this.getOutModel() );
    }

    getOutModel(): ApplicationCreateDto {
        const files = this.form.getRawValue();

        // extract all array values from the form
        const giroFiles: any[] = Object.keys(files).flatMap(value => {
            return files[value].flatMap((f: any) => {
                return {
                    ...f,
                    id: value,
                }
            });
        });

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
}
