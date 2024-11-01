import {Component, forwardRef, HostBinding, Injector, Input} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ngfModule} from "angular-file";
import {FileHelper} from "../../helpers/file.helper";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {LoaderService} from "../../services/loader";
import {UuidHelper} from "../../helpers/uuid-helper";
import {DefaultSystemMessagesService} from "../defaut-system-message-service";
import {GiroFile} from "../../objects/giro-file";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-giro-upload',
    standalone: true,
    imports: [
        FileUploadModule,
        NgForOf,
        JsonPipe,
        NgIf,
        ngfModule,
        RippleModule,
        TooltipModule,
        NgClass
    ],
    templateUrl: './giro-upload.component.html',
    styleUrl: './giro-upload.component.scss',
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => GiroUploadComponent),
                multi: true
            }
        ]
})
export class GiroUploadComponent implements ControlValueAccessor {

    @HostBinding('class.invalid-input') hostClass = true;

    // file front end as input
    // file to display data
    // file to manipulate data
    @Input() multiple: boolean = true;

    @Input()
    filesInput: any[] = []

    @Input()
    accept = '*'

    @Input()
    base64: boolean = false;

    @Input()
    maxSize: any

    @Input()
    uploadTitle: string = 'Agregue un archivo o arrástrelo aquí';

    @Input()
    uploadDescription: string = 'Se permite un máximo de 50 mb, en formato pdf o csv';

    @Input()
    plainBase64: boolean = true;

    _files: GiroFile[] = []

    files: File[] = []
    __files: File[]
    __dragFiles: any;
    validComboDrag: any
    lastInvalids: any
    loaderId = UuidHelper.get();
    ngControl: NgControl;

    constructor(
        private injector: Injector,
        public loaderService: LoaderService,
        private log: NGXLogger,
        private messagesService: DefaultSystemMessagesService) {
    }

    ngAfterViewInit(): void {
        this.ngControl = this.injector.get(NgControl);
    }

    async upload(files: File[]) {
        if (!this.multiple) {
            this.files = [files[files.length - 1]];
        } else {
            this.files = files;
        }

        if (this.base64) {
            this.loaderService.loading[this.loaderId] = true;

            this._files = await Promise.all(this.files.map(async file => {
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

            this.loaderService.loading[this.loaderId] = false;
        } else {
            this._files = this.files.map((file) => {
                    return {
                        name: file.name,
                        lastModified: file.lastModified,
                        size: file.size,
                        contentType: file.type,
                        webkitRelativePath: file.webkitRelativePath,
                        file: file,
                    }
                }
            );
        }
        this.log.info(this._files);
        this.setValue(this._files);
    }

    async toBase64(file: File) {
        const result = await FileHelper.toBase64(file);
        if (this.plainBase64) {
            return FileHelper.cleanBase64String(result);
        } else {
            return result;
        }
    }

    remove(indexToRemove: number) {
        if (indexToRemove >= 0 && indexToRemove < this.files.length) {
            this.files.splice(indexToRemove, 1);
        }

        if (indexToRemove >= 0 && indexToRemove < this._files.length) {
            this._files.splice(indexToRemove, 1);
        }
        this.setValue(this._files);
    }

    /////////////////////////////////

    setValue(val: GiroFile[]) {
        this.onChange(val)
        this.onTouch(val)
    }

    writeValue(value: GiroFile[]) {
        this.setValue(value);
    }

    onChange: any = () => {
    }

    onTouch: any = () => {
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }

    lastInvalidsChange($event: { file: File; type: string }[]): void {
        if ($event) {
            const toMb = this.maxSize / 1000000;
            const fileExtensions = this.accept.split(',');
            const message = `Se ha excedido el límite de ${toMb} MB ${this.generateMessage(fileExtensions)}. Por favor, ajusta el tamaño del archivo y vuelve a intentarlo.`;
            this.messagesService.error(message);
        }
    }

    generateMessage(fileExtensions: string | any[]): string {
        let message = "Para ";
        if (fileExtensions.length === 1) {
            message += "archivo en formato";
        } else {
            message += "archivos en formato";
        }

        if (fileExtensions.length === 1) {
            message += " " + fileExtensions[0].toUpperCase();
        } else {
            for (let i = 0; i < fileExtensions.length; i++) {
                if (i === fileExtensions.length - 1) {
                    message += " o " + fileExtensions[i].toUpperCase();
                } else {
                    message += " " + fileExtensions[i].toUpperCase() + " ";
                }
            }
        }
        message += ".";
        return message;
    }

    get invalidInput(): string {


        console.log(this.ngControl?.touched && this?.ngControl?.dirty && this.ngControl?.invalid)

        return this.ngControl?.touched && this?.ngControl?.dirty && this.ngControl?.invalid ? 'invalid-input' : '';
    }

}
