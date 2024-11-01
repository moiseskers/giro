import {Component, Input} from '@angular/core';

export interface AppViewData {
  key: string;
  value: string;
}

@Component({
  selector: 'app-view-data',
  standalone: true,
  imports: [],
  templateUrl: './app-view-data.component.html',
  styleUrl: './app-view-data.component.scss'
})
export class AppViewDataComponent {

  @Input()
  key: any;

  @Input()
  value: any;

}
