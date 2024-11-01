import {Component, Input} from '@angular/core';
import {MatchingResponseDto} from '../../../../../shared/models/matching-response.dto';
import {CategoryTypeEnum} from '../../../../../shared/enums/category-type.enum';

@Component({
  selector: 'app-matching-data',
  templateUrl: './matching-data.component.html',
  styleUrl: './matching-data.component.scss'
})
export class MatchingDataComponent {

  @Input()
  model: MatchingResponseDto;

  @Input() isLoading: boolean = true;

  protected readonly CategoryTypeEnum = CategoryTypeEnum;

}
