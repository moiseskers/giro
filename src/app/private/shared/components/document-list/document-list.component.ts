import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {NgIf} from '@angular/common';
import {AppPaginatorModule} from '../../../../shared/components/app-paginator';
import {GiroDataViewComponent} from '../../../../shared/components/giro-menu-bar/giro-data-view.component';
import {Page} from '../../../../shared/objects/page';
import {FilterHistoryHelper} from '../../../../shared/helpers/filter-history.helper';
import {DocumentResponseDto} from '../../../../shared/models/document-response.dto';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrl: './document-list.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        TableModule,
        ButtonModule,
        NgIf,
        AppPaginatorModule
    ]
})
export class DocumentListComponent {

    @Input()
    displayDeleteButton: boolean = true;

    @Input()
    disableDeleteButton: boolean = false;

    @Input()
    disableDownloadButton: boolean = false;

    @Input()
    aTitle: string = 'Documentos';

    @Input() buttonLabel: string = 'Nuevo';

    @Input()
    model: Page<DocumentResponseDto>;

    public modelIn = (model: DocumentResponseDto) => model;

    @ViewChild('actionsTd') actionsTd: ElementRef;

    buttonCount: number;

    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
    @Output() downloadEvent: EventEmitter<any> = new EventEmitter();
    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() newEvent: EventEmitter<any> = new EventEmitter();

    filterHistoryHelper = new FilterHistoryHelper();


    ngAfterViewInit(): void {
        this.countButtons();
    }

    new() {
        this.newEvent.emit();
    }

    delete(id: string) {
        this.deleteEvent.emit(id);
    }

    download(id: string) {
        this.downloadEvent.emit(id);
    }

    page($event: any): void {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }

    countButtons() {
        setTimeout(() => {
            const buttons = this.actionsTd?.nativeElement?.querySelectorAll('button');
            this.buttonCount = buttons?.length;
        }, 500);
    }

}
