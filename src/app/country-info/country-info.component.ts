import { Component, DoCheck, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesDataService } from '../Services/countriesData.service';
import { ThemeChangerService } from '../Services/themeChanger.service';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css',
})
export class CountryInfoComponent implements OnInit, OnDestroy ,DoCheck {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  code: string = '';
  paramMapObs: any;
  selectedCountryInfo: any;
  countryInfo: any;
  darkMode:boolean=false;

  contriesDataService: CountriesDataService = inject(CountriesDataService);
  themeChangerService:ThemeChangerService=inject(ThemeChangerService);

  ngOnInit(): void {
    //  console.log(this.activeRoute.snapshot.params['id']);
    //  console.log(this.activeRoute.snapshot.paramMap.get('code')); //not update when route changes
    //  this.code=+this.activeRoute.snapshot.paramMap.get('code')!;

    this.paramMapObs = this.activeRoute.paramMap.subscribe((data) => {
      // console.log(data);
      this.code = data.get('code')!;
    });

    this.contriesDataService.fetchCountryInfo(this.code);
    this.contriesDataService.selectedCountryInfo.subscribe((data) => {
      console.log(data);
      this.selectedCountryInfo = data;
    });

    this.darkMode=JSON.parse(localStorage.getItem('darkMode')!);
    //  console.log(this.selectedCountryInfo);
  }

  ngDoCheck(): void {
      this.themeChangerService.darkMode.subscribe((data)=>{
       this.darkMode=data;
      })
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe();
  }

  showCountryInfo(code: string) {
    console.log('code: ', code);
    this.contriesDataService.fetchCountryInfo(code);
    this.contriesDataService.selectedCountryInfo.subscribe((data) => {
      console.log(data);
      this.selectedCountryInfo = data;
    });
  }
}
