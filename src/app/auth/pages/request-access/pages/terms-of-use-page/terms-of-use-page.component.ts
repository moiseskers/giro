import {Component} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-terms-of-use-page',
  templateUrl: './terms-of-use-page.component.html',
  styleUrl: './terms-of-use-page.component.scss'
})
export class TermsOfUsePageComponent {

  displayPage = false;
  termOfUseUrl: string;

  ngOnInit(): void {
    this.termOfUseUrl = environment.termOfUseUrl;
    this.displayPage = true;
  }
  
}
