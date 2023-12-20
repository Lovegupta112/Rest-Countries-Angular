import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionSubRegionService {
  constructor() {}

  totalRegion = new Subject<string[]>();
  totalSubregion = new Subject<string[]>();
  totalRegionAndSubRegion: Map<string, Set<string>> | undefined;

  setRegion(countries: any) {
    // let regions = countries.reduce((total: Set<string>, curCountry: any) => {
    //   return total.add(curCountry.region);
    // }, new Set());
    // console.log('totalRegions: ', Array.from(regions));
    // this.totalRegion.next(Array.from(regions));

    let total = countries.reduce(
      (total: Map<string, Set<string>>, curCountry: any) => {
        if (total.has(curCountry.region)) {
          let subregionSet = total.get(curCountry.region);
          subregionSet?.add(curCountry.subregion);
        } else {
          total.set(curCountry.region, new Set([curCountry.subregion]));
        }

        return total;
      },
      new Map()
    );
    this.totalRegionAndSubRegion = total;

    console.log('totalRegionAndSubRegion: ', this.totalRegionAndSubRegion);
    // console.log(Array.from(total.keys()));
    this.totalRegion.next(Array.from(total.keys()));
  }

  setSubRegion(region: string) {
    //  console.log('Selected region: ',region);
    const subregion = region
      ? Array.from(this.totalRegionAndSubRegion?.get(region)!)
      : [];
    // console.log('subregions: ',subregion);
    this.totalSubregion.next(subregion);
  }
}
