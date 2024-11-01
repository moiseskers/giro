import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    styles: [
        `

          .topbar-menubutton {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            flex-shrink: 0;
            transition: background-color var(--transition-duration);

            i {
              font-size: 1.25rem;
              color: var(--topbar-item-text-color);
              transition: color var(--transition-duration);
            }

            &:hover {
              background-color: var(--primary-color);

              i {
                color: var(--primary-color-text);
              }
            }
          }
          
        `
        
    ]
})
export class AppSidebarComponent {
    timeout: any = null;
    @ViewChild('menuContainer') menuContainer!: ElementRef;
    constructor(public layoutService: LayoutService, public el: ElementRef) {}

    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.sidebarActive = true;
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => (this.layoutService.state.sidebarActive = false), 300);
            }
        }
    }

    anchor() {
        this.layoutService.state.anchored = !this.layoutService.state.anchored;
    }
}
