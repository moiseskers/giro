import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeclarationRequestRecurrence } from 'src/app/shared/enums/declaration-request-recurrence';
import { ProduderDeclarationService } from '../../services/producer-declaration.service';
import { GeneralHelper } from 'src/app/shared/helpers/general-helper';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';
import { ProfileService } from 'src/app/shared/services/auth/profile.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader';

@Component({
    selector: 'app-producer-mass-declaration',
    templateUrl: './producer-mass-declaration.component.html',
    styleUrls: ['./producer-mass-declaration.component.scss'],
})
export class ProducerMassDeclarationComponent implements OnInit {
    form: FormGroup;
    declarationType: DeclarationRequestRecurrence;
    @Output() saveEvent: EventEmitter<DocumentRequestDto[]> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();
    @Input() buttonIsLoading: boolean;
    organizationId: string;
    id: string;

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private declarationService: ProduderDeclarationService,
        private fb: FormBuilder,
        private profileService: ProfileService,
        public loaderService : LoaderService,
        private router: Router
    ) {}

    ngOnInit() {

        this.declarationType = this.config.data.declarationType;
        this.id = this.config.data.id;

        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.form = this.fb.group({
            file: [],
        });

    }

    downloadTemplate() {
        const link =
            this.declarationType === 'Anual'
                ? 'https://docs.google.com/spreadsheets/d/1yJPEv3fsEHhtHMviTAtLGwGUQzDh3DVsUUhl3cj_fIY/export?format=xlsx'
                : 'https://docs.google.com/spreadsheets/d/1a1Sc043Dt974GPYFSsTXggWsTvTbT_dJuvUNSCo2U8w/export?format=xlsx';

        window.open(link, '_self');
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }
    save() {
        if (this.form.invalid) return;

        const documents = this.getBiddingDocumentOut();
        const loaderId = 'massDeclarationLoader';

        this.loaderService.activateLoader(() => {
            return new Promise<void>((resolve) => {
                this.declarationService.importDeclaration(this.organizationId, this.id, documents).subscribe({
                    next: (response) => {
                        this.ref.close(true);
                        resolve();
                        this.router.navigate(['/private/producer/mass/pages/view/', response.id]);
                    },
                });
            });
        }, loaderId);
    }

    getBiddingDocumentOut(): DocumentRequestDto {
        const files = this.form.get('file')?.value;
         if (!files || files.length === 0) return null;

    const file = files[0];
    return {
        name: file.name,
        file: file.file,
        contentType: file.contentType,
    };
    }
}
