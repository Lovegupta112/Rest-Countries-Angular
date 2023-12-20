import { Component, Input ,inject , OnInit,DoCheck} from '@angular/core';
import { ThemeChangerService } from '../../../Services/themeChanger.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent implements OnInit,DoCheck{
  @Input()
  country: any;
  darkMode:boolean=false;

  themeChangerService:ThemeChangerService=inject(ThemeChangerService);

  ngOnInit(): void {
      this.darkMode=JSON.parse(localStorage.getItem('darkMode')!);
  }
 ngDoCheck(): void {
  this.themeChangerService.darkMode.subscribe((data)=>{
    console.log('data: ',data);
   this.darkMode=data;
 })
 }

}
