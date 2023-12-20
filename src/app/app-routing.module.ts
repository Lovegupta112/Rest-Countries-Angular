import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CountryInfoComponent } from './country-info/country-info.component';

const routes: Routes = [
  // {path:'',redirectTo:'allCountries',pathMatch:'prefix'},
  { path: '', redirectTo: 'allCountries', pathMatch: 'full' },
  { path: 'allCountries', component: MainComponent },
  { path: 'country/:code', component: CountryInfoComponent },
  { path: '**', component: NotFoundComponent }, //wild card route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
