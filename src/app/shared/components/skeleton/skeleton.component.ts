import {Component, Input} from '@angular/core';
import {SkeletonModule} from 'primeng/skeleton';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  standalone: true,
  imports: [
    SkeletonModule,
    NgIf,
    NgTemplateOutlet
  ]
})
export class SkeletonComponent {

  @Input()
  height: string = '338px';

  @Input()
  isLoading: boolean = true;
  
}
