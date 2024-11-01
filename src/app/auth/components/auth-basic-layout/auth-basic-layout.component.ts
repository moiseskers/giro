import {Component, Input, TemplateRef} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgTemplateOutlet} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AppDefaultCenterGridModule} from "../../../shared/components/app-default-center-grid";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-auth-basic-layout',
  templateUrl: './auth-basic-layout.component.html',
  standalone: true,
  imports: [
    ButtonModule,
    NgTemplateOutlet,
    RouterLink,
    AppDefaultCenterGridModule,
    DividerModule
  ],
  styleUrl: './auth-basic-layout.component.scss'
})
export class AuthBasicLayoutComponent {
  @Input() content: TemplateRef<any>;
  @Input() componentTitle: string;
}
