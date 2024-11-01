import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppButtonModule} from '../../../../shared/components/button/button';
import {Button, ButtonDirective} from 'primeng/button';
import {
    DynamicFormBuilderNgModelComponent
} from '../../../../shared/components/dynamic-form-builder-ng-model/dynamic-form-builder-ng-model.component';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {PaginatorModule} from '../../../../shared/components/paginator/paginator';
import {PrimeTemplate} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {SidebarModule} from 'primeng/sidebar';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-material-search-bar',
    templateUrl: './material-search-bar.component.html',
    styleUrl: './material-search-bar.component.scss',
    standalone: true,
    imports: [AppButtonModule, Button, ButtonDirective, DynamicFormBuilderNgModelComponent, InputGroupAddonModule, InputGroupModule, InputTextModule, NgIf, NgTemplateOutlet, PaginatorModule, PrimeTemplate, Ripple, SidebarModule, ReactiveFormsModule]
})
export class MaterialSearchBarComponent {

    control =  new FormControl<string>(null);

    @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() buttonEvent: EventEmitter<void> = new EventEmitter<void>();
    @Input() placeholder: string;
    @Input() label: string;


}
