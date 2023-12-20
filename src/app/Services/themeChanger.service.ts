import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class ThemeChangerService{

    darkMode=new Subject<boolean>();

    
      changeTheme(currentTheme:boolean){
        this.darkMode.next(currentTheme);
        console.log(currentTheme);
      }
}