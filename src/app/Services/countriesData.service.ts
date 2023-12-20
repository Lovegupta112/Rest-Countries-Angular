import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { RegionSubRegionService } from './region-subregion.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesDataService {
  constructor(private regionSubregionService: RegionSubRegionService) {}

  allCountries = new Subject<any>();
  selectedCountryInfo = new Subject<any>();

  fetchCountries() {
    // this.http.get("https://restcountries.com/v3.1/all")
    ajax('https://restcountries.com/v3.1/all').subscribe((data: any) => {
      // console.log(data.response);
      this.allCountries.next(data.response);
      this.regionSubregionService.setRegion(data.response);
    });
  }

  fetchCountryInfo(code: string) {
    console.log(code);
    ajax(`https://restcountries.com/v3.1/alpha/${code}`).subscribe(
      (data: any) => {
        console.log(data.response[0]);
        const info = data.response[0];
        let countryInfo = info;
        countryInfo.nativeName = info.name.nativeName
          ? Object.values(info?.name.nativeName)[0]
          : '';
        countryInfo.currency = info.currencies
          ? Object.values(info?.currencies)[0]
          : '';
        countryInfo.countryLanguages = info.languages
          ? Object.values(info.languages)
          : '';

        if (info.borders) {
          this.fetchCountries();
          this.allCountries.subscribe((data) => {
            countryInfo.borderCountries = this.mapCodeToCountry(
              data,
              info.borders
            );
          });
        } else {
          countryInfo.borderCountries = '';
        }
        this.selectedCountryInfo.next(countryInfo);
      }
    );
  }

  mapCodeToCountry(
    data: any[],
    borders: string[]
  ): { name: string; code: string }[] {
    let countryBorders: { name: string; code: string }[] = borders.map(
      (border) => {
        return data
          .filter((country: any) => country.cca3.includes(border))
          .map((country: any) => ({
            name: country.name.common,
            code: border,
          }))[0];
      }
    );
    // console.log(countryBorders);
    return countryBorders;
  }
}
