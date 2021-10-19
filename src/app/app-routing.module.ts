import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountriesComponent } from './components/countries/countries.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]  },
  { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard] },
  { path: 'country/:id', component: CountryDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'countries', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
