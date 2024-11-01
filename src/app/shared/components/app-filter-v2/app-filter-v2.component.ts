import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    WritableSignal
} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {AppButtonModule} from '../button/button';
import {Button, ButtonDirective} from 'primeng/button';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {PrimeNgTableSortHelperModule} from '../prime-ng-table-sort-helper';
import {AppDynamicFormBuilderModule} from '../app-dynamic-form-builder';
import {Ripple} from 'primeng/ripple';
import {SidebarModule} from 'primeng/sidebar';
import {FieldV2} from '../dynamic-form-builder-ng-model/models/fieldV2';
import {
    DynamicFormBuilderNgModelComponent
} from '../dynamic-form-builder-ng-model/dynamic-form-builder-ng-model.component';
import {
    PrimeNgTableSortHelperV2Component
} from '../prime-ng-table-sort-helper-v2/prime-ng-table-sort-helper-v2.component';
import {Table} from 'primeng/table';
import {PrimeNgTableSortHelper} from '../../helpers/prime-ng-table-sort.helper';
import {Nullable} from 'primeng/ts-helpers';
import {NGXLogger} from 'ngx-logger';
import {FormGroup} from '@angular/forms';

// <ng-template pTemplate="fields">

@Component({
    selector: 'app-filter-v2',
    templateUrl: './app-filter-v2.component.html',
    standalone: true,
    imports: [
        NgTemplateOutlet,
        AppButtonModule,
        Button,
        ButtonDirective,
        InputGroupAddonModule,
        InputGroupModule,
        InputTextModule,
        NgIf, PaginatorModule, PrimeNgTableSortHelperModule, PrimeTemplate, AppDynamicFormBuilderModule, NgForOf, Ripple, SidebarModule, DynamicFormBuilderNgModelComponent, PrimeNgTableSortHelperV2Component],
    styleUrl: './app-filter-v2.component.scss'
})
export class AppFilterV2Component {

    //####template code START###############################################################################################################
    sidebarFieldsTemplate: Nullable<TemplateRef<any>>;
    buttonsTemplate:  Nullable<TemplateRef<any>>;
    fullButtonsTemplate:  Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;
    //####template code END###############################################################################################################

    @ViewChild(DynamicFormBuilderNgModelComponent)
    dynamicFormBuilderNgModelComponent: DynamicFormBuilderNgModelComponent

    @Input()
    fields: FieldV2[] = [];

    @Input() table!: Table;

    hasBase: boolean = false;
    hasInputs: boolean = true;

    baseFilterInput: FieldV2;
    inputs: FieldV2[] = [];
    primeNgTableSortHelper = new PrimeNgTableSortHelper();

    filters = {};

    sidebarVisible: boolean | WritableSignal<boolean>;

    @Output() filterEvent = new EventEmitter();
    @Output() sortEvent = new EventEmitter();

    @Input()
    form: FormGroup

    @Input()
    hasDefaultButtons: boolean = true;

    constructor(private log: NGXLogger) {}

    ngOnInit(): void {
        this.checks();
        this.startUp();
    }

    ngAfterContentInit(): void {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'fields':
                    this.log.info('initialized with custom fields!');
                    this.sidebarFieldsTemplate = item.template;
                    break;

                case 'buttons':
                    this.buttonsTemplate = item.template;
                    break;

                case 'full-buttons-template':
                    this.fullButtonsTemplate = item.template;
                    break;
            }
        });
    }

    ngDoCheck(): void {
        if (!this.primeNgTableSortHelper.stopCalling) {
            this.primeNgTableSortHelper.startUp(this.table);
        } else {
            this.primeNgTableSortHelper.sortEvent = this.sortEvent;
        }
    }

    fromBase(): void {
        this.clearAllInputs();
        this.clearSorts();

        this.mapToFilters();
        this.submit();
    }

    mapToFilters(): void {
        this.filters = this.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {} as { [key: string]: any });
    }

    inputsSubmit(): void {
        this.mapToFilters();
        this.submit();
    }

    submit(): void {
        this.log.info('submit this.filters ', this.filters)
        this.filterEvent.emit(this.filters);
        this.close();
    }

    close(): void {
        this.clearAllInputs();
        this.sidebarVisible = false;
    }

    checks(): void {
        const baseFiltersCount = this.fields.filter(filter => filter.base).length;
        const hasMoreThanOneBase = baseFiltersCount > 1;
        if (hasMoreThanOneBase) {
            throw Error('Cannot have two bases!!');
        }
    }

    //####CLEAR CODE START###############################################################################################################
    clearBaseFilterInput(): void {
        this.baseFilterInput.value = '';
    }

    clearAllInputs(): void {
        this.inputs.forEach(field => {
            field.value = '';
        });
    }

    public clearAllFields(): void {
        this.fields.forEach(field => {
            field.value = '';
        });
    }

    clearSorts(): void {
        this.primeNgTableSortHelper.clear();
    }

    clearAllFiltersAndSubmit(): void {
        this.clearAllFilters();
        this.mapToFilters();
        this.submit();
    }

    clearAllFilters(): void {
        if (this.hasBase) {
            this.clearBaseFilterInput();
        }

        if (this.hasInputs) {
            this.clearAllInputs()
        }

        if (this.primeNgTableSortHelper.hasSort) {
            this.clearSorts();
        }
    }

    private startUp(): void {
        this.hasBase = this.fields.some(filter => filter.base);
        this.hasInputs = this.fields.some(filter => !filter.base);

        if (this.hasBase)
            this.baseFilterInput = this.fields.filter(filter => filter.base)[0];

        if (this.hasInputs) {
            this.inputs = this.fields.filter(filter => !filter.base);
        }
    }
    //####CLEAR CODE END###############################################################################################################

}
