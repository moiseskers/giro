import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DocumentResponseDto} from "../../../../../shared/models/document-response.dto";
import {GiroUploadComponent} from "../../../../../shared/components/upload/giro-upload.component";
import {ButtonModule} from "primeng/button";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {JsonPipe} from "@angular/common";
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-document-form',
    templateUrl: './document-form.component.html',
    styleUrl: './document-form.component.scss',
    standalone: true,
    imports: [
        GiroUploadComponent,
        ButtonModule,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        JsonPipe
    ]
})
export class DocumentFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<DocumentRequestDto[]> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: DocumentResponseDto;
    @Input() buttonIsLoading: boolean;

    @Input() multiple: boolean = true;

    documents: any = [];


    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            files: [],
        });
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.saveEvent.emit(this.getDocumentOut());
    }

    getDocumentOut(): DocumentRequestDto[] {
        const _files: any = this.form.getRawValue();
        return _files.files.map((file: { name: any; file: string; contentType: any; }) => {
            return {
                name: file.name,
                file: file.file,
                contentType: file.contentType,
            }
        });
    }
}
