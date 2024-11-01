import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProducerService {
  private selectedProducerIdSource = new BehaviorSubject<string | null>(null);
  selectedProducerId$ = this.selectedProducerIdSource.asObservable();

  updateSelectedProducerId(producerId: string | null) {
    this.selectedProducerIdSource.next(producerId);
  }
}
