import {Component} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-success-page',
  templateUrl: './request-success-page.component.html',
  styleUrl: './request-success-page.component.scss'
})
export class RequestSuccessPageComponent {

  constructor(private log: NGXLogger, private router: Router) {
  }

  async returnToWebsite() {
    this.log.info('return to website button clicked!');
    await this.router.navigate(['/']);
  }
}
