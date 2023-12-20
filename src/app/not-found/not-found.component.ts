import { Component, DoCheck, OnInit ,inject} from '@angular/core';
import { ThemeChangerService } from '../Services/themeChanger.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent  implements OnInit , DoCheck{

  darkMode:boolean=false;
  themeChangerService:ThemeChangerService=inject(ThemeChangerService);

  
  ngOnInit(): void {
      this.darkMode=JSON.parse(localStorage.getItem('darkMode')!);
  }

  ngDoCheck(): void {
      this.themeChangerService.darkMode.subscribe((data)=>{
        this.darkMode=data;
      })
  }
}
