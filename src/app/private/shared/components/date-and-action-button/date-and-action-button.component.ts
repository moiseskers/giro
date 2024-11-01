import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {ngfModule, ngfSelect} from 'angular-file';
import {FileHelper} from '../../../../shared/helpers/file.helper';
import {NgIf} from '@angular/common';
import {Role} from '../../../../shared/enums/role';
import {HasAnyRolePipeModule} from '../../../../shared/pipes/has-any-role/has-any-role-pipe.module';

@Component({
  selector: 'app-date-and-action-button',
  templateUrl: './date-and-action-button.component.html',
  styleUrl: './date-and-action-button.component.scss',
  standalone: true,
    imports: [
        ToolbarModule,
        ButtonDirective,
        Ripple,
        ngfModule,
        NgIf,
        HasAnyRolePipeModule
    ]
})
export class DateAndActionButtonComponent {

    @ViewChild(ngfSelect) ngfSelect: ngfSelect;

    @Output() uploadBase64: EventEmitter<any> = new EventEmitter<any>();
    @Input() date: string;
    @Input() aTitle: string;
    @Input() uploadButtonIsLoading: boolean = false;

    fileDropDisabled: boolean = false;

    async upload($event: any) {
        const file64 = await Promise.all($event.map(async file => {
            const base64 = await this.toBase64(file);
            return {
                name: file.name,
                lastModified: file.lastModified,
                size: file.size,
                contentType: file.type,
                webkitRelativePath: file.webkitRelativePath,
                file: base64,
            }
        }));
        this.uploadBase64.emit(file64[0]);

        this.clearFileInput();
    }

    async toBase64(file: File) {
        const result = await FileHelper.toBase64(file);
        return FileHelper.cleanBase64String(result);
    }

    clearFileInput() {
        if (this.ngfSelect) {
            this.ngfSelect.file = null;
            this.ngfSelect.files = null;
            this.ngfSelect.clearFileElmValue()
        }
    }

    protected readonly Role = Role;
}
