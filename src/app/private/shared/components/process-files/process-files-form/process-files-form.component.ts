import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GiroFile} from "../../../../../shared/objects/giro-file";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
  selector: 'app-process-files-form',
  templateUrl: './process-files-form.component.html',
  styleUrl: './process-files-form.component.scss'
})
export class ProcessFilesFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<DocumentRequestDto[]> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: DocumentRequestDto;
    @Input() buttonIsLoading: boolean;

    documents: any = [];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            files: [],
        });
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.saveEvent.emit(this.getBiddingDocumentOut());
    }

    getBiddingDocumentOut(): DocumentRequestDto[] {
        const _files: GiroFile[] = this.form.getRawValue()?.files || [];
        return _files.map((file: GiroFile) => {
            return {
                name: file.name,
                file: file.file,
                contentType: file.contentType,
            }
        });
    }
}
