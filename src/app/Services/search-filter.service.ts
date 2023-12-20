import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  constructor() {}

  changeText: EventEmitter<string> = new EventEmitter<string>();
  selectedRegion = new Subject<string>();
  selectedSubregion = new Subject<string>();
  selectedSortType = new Subject<string>();
  selectedSortOption = new Subject<string>();

  onSearch(text: string): void {
    // this.changeText.emit(text)
    // console.log(text);
    this.changeText.next(text);
  }

  onRegion(text: string): void {
    // console.log(text);
    this.selectedSubregion.next('');
    this.selectedRegion.next(text);
  }
  onSubRegion(text: string): void {
    this.selectedSubregion.next(text);
  }
  onSortType(text: string): void {
    console.log(text);
    this.selectedSortType.next(text);
  }
  onSortOption(text: string): void {
    this.selectedSortOption.next(text);
  }
}
