import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-image',
  standalone: true,
  imports: [],
  templateUrl: './empty-image.component.html',
  styleUrl: './empty-image.component.scss'
})
export class EmptyImageComponent {

  @Input()
  message: string;

}
