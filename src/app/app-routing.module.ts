import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicsComponent } from './pages/medics/medics.component';
import {LoginComponent} from './pages/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'medics', component: MedicsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
