import { Component, OnInit, inject, DoCheck } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { SearchFilterService } from '../../Services/search-filter.service';
import { RegionSubRegionService } from '../../Services/region-subregion.service';
import { CountriesDataService } from '../../Services/countriesData.service';
import { ThemeChangerService } from '../../Services/themeChanger.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css',
})
export class CountryListComponent implements OnInit, DoCheck {
  allCountries: any = [];
  filteredCountries: any = [];
  searchText: string = '';
  selectedRegion: string = '';
  selectedSubRegion: string = '';
  selectedSortType: string = '';
  selectedSortOption: string = '';
  darkMode: boolean = false;

  // constructor(private http: HttpClient,private searchFilterService:SearchFilterService) {}
  searchFilterService: SearchFilterService = inject(SearchFilterService);
  countriesDataService: CountriesDataService = inject(CountriesDataService);
  themeChangerService: ThemeChangerService = inject(ThemeChangerService);

  ngOnInit(): void {
    this.countriesDataService.fetchCountries();
    this.countriesDataService.allCountries.subscribe((data) => {
      console.log(data);
      this.allCountries = data;
      this.filteredCountries = data;
    });
    this.searchFilterService.changeText.subscribe((text) => {
      this.searchText = text.toLowerCase();
      // console.log('searchText: ',this.searchText);
    });

    this.searchFilterService.selectedRegion.subscribe((text) => {
      this.selectedRegion = text;
    });
    this.searchFilterService.selectedSubregion.subscribe((text) => {
      this.selectedSubRegion = text;
    });
    this.searchFilterService.selectedSortType.subscribe((text) => {
      this.selectedSortType = text;
    });
    this.searchFilterService.selectedSortOption.subscribe((text) => {
      this.selectedSortOption = text;
    });

    this.darkMode = JSON.parse(localStorage.getItem('darkMode')!);
  }

  ngDoCheck() {
    //  this.filteredCountries=this.allCountries.filter((country:any)=>country.region?.includes(this.selectedRegion)).filter((country:any)=>country.subregion?.includes(this.selectedSubRegion));

    this.filteredCountries = this.allCountries.filter((country: any) =>
      country.region?.includes(this.selectedRegion)
    );

    console.log('region: ', this.selectedRegion);

    if (this.selectedSubRegion) {
      this.filteredCountries = this.filteredCountries.filter((country: any) =>
        country.subregion?.includes(this.selectedSubRegion)
      );
    }

    this.filteredCountries = this.filteredCountries.filter((country: any) =>
      country.name.common.toLowerCase().includes(this.searchText)
    );
    console.log(this.selectedSortType, this.selectedSortOption);

    if (this.selectedSortType) {
      this.filteredCountries = this.filteredCountries.sort(
        (ob1: any, ob2: any) => {
          let ob1SortTypeValue = ob1[this.selectedSortType];
          let ob2SortTypeValue = ob2[this.selectedSortType];
          if (ob1SortTypeValue < ob2SortTypeValue) {
            return this.selectedSortOption === 'ascending' ? -1 : 1;
          } else {
            return this.selectedSortOption === 'ascending' ? 1 : -1;
          }
        }
      );
    }
    console.log(this.filteredCountries);

    this.themeChangerService.darkMode.subscribe((data) => {
      this.darkMode = data;
    });
  }
}
