import { Component, DoCheck, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { SearchFilterService } from '../../Services/search-filter.service';
import { RegionSubRegionService } from '../../Services/region-subregion.service';
import { ThemeChangerService } from '../../Services/themeChanger.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css',
})
export class SearchFilterComponent implements OnInit ,DoCheck {
  searchInput: string = '';
  regions: string[] = [];
  subregion: string[] = [];
  regionText: string = '';
  subregionText: string = '';
  sortOptionText: string = 'ascending';
  sortTypeText: string = '';
  darkMode:boolean=false;

  searchFilterService: SearchFilterService = inject(SearchFilterService);
  regionSubregionService: RegionSubRegionService = inject(
    RegionSubRegionService
  );
  themeChangerService:ThemeChangerService=inject(ThemeChangerService);


  ngOnInit(): void {
    this.regionSubregionService.totalRegion.subscribe((data) => {
      // console.log(data);
      this.regions = data;
    });
    this.regionSubregionService.totalSubregion.subscribe((data) => {
      // console.log(data);
      this.subregion = data;
    });

    this.darkMode=JSON.parse(localStorage.getItem('darkMode')!);
  }


  ngDoCheck(): void {
    this.themeChangerService.darkMode.subscribe((data)=>{
      // console.log('main: ',data);
      this.darkMode=data;
    })
}

  // @Output()
  //  searchTextChange:EventEmitter<string>=new EventEmitter<string>();

  onSearchTextChanged(): void {
    // this.searchTextChange.emit(this.searchInput);
    // console.log('search: ',this.searchInput);
    this.searchFilterService.onSearch(this.searchInput);
  }

  setRegionText(): void {
    //  console.log(this.regionText);
    this.regionSubregionService.setSubRegion(this.regionText);
    this.searchFilterService.onRegion(this.regionText);
    this.subregionText = '';
  }

  setSubregionText(): void {
    this.searchFilterService.onSubRegion(this.subregionText);
  }
  setSortOptions() {
    // console.log(this.sortOptionText);
    this.searchFilterService.onSortOption(this.sortOptionText);
  }
  setSortTypes() {
    // console.log(this.sortTypeText);
    this.searchFilterService.onSortType(this.sortTypeText);
  }
}
