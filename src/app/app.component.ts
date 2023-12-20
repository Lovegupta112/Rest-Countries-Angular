import { Component ,inject,OnInit,DoCheck} from '@angular/core';
import { ThemeChangerService } from './Services/themeChanger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit,DoCheck {
  title = 'restCountries';

  darkMode:boolean=false;

  themeChangerService:ThemeChangerService=inject(ThemeChangerService);

   ngOnInit(): void {
    // this.themeChangerService.theme.subscribe((data)=>{
    //   console.log('main: ',data);
    // })
    this.darkMode=JSON.parse(localStorage.getItem('darkMode')!);
   }
  ngDoCheck(): void {
      this.themeChangerService.darkMode.subscribe((data)=>{
        // console.log('main: ',data);
        this.darkMode=data;
      })
  }

}
