import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BiddingDocumentResponseDto} from "../../../../../../shared/models/bidding-document-response.dto";
import {GeneralHelper} from "../../../../../../shared/helpers/general-helper";
import {DocumentRequestDto} from '../../../../../../shared/models/document-request.dto';

@Component({
  selector: 'app-registered-manager-form',
  templateUrl: './registered-manager-form.component.html',
  styleUrl: './registered-manager-form.component.scss'
})
export class RegisteredManagerFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<DocumentRequestDto[]> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: BiddingDocumentResponseDto;
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
        const _files: any = this.form.getRawValue();
        return _files.files.map((file: { name: any; base64: any; type: any; }) => {
            return {
                name: file.name,
                file: file.base64.split(',')[1],
                type: file.type,
            }
        });
    }
}
