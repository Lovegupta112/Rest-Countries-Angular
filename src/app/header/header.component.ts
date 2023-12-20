import { Component , OnInit, inject } from '@angular/core';
import { ThemeChangerService } from '../Services/themeChanger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements  OnInit {

   darkMode:boolean=false;

  themeChangerService:ThemeChangerService=inject(ThemeChangerService);

 ngOnInit(): void {
  if(!localStorage.getItem('darkMode')){
    localStorage.setItem('darkMode',JSON.stringify(false));
    this.themeChangerService.changeTheme(this.darkMode);
  }
  else{
    this.darkMode=JSON.parse(localStorage.getItem('darkMode')!);
    this.themeChangerService.changeTheme(this.darkMode);
  }
 }

  
  
  changeTheme(){
 
    let currentTheme:boolean=JSON.parse(localStorage.getItem('darkMode')!);
     console.log('current: ',currentTheme);
    //  this.theme={
    //   'background-color':currentTheme['background-color']=='var(--Very-Light-Gray)'?'var(--Dark-Blue)':'var(--Very-Light-Gray)',
    //   color:currentTheme.color=='black'?'white':'black',
    // }
    this.darkMode=currentTheme?false:true;
    localStorage.setItem('darkMode',JSON.stringify(this.darkMode));
    this.themeChangerService.changeTheme(this.darkMode);
  }
}
