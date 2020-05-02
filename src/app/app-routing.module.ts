import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicsComponent } from './pages/medics/medics.component';


const routes: Routes = [
  { path: 'medics', component: MedicsComponent },
  { path: '', redirectTo: '/medics', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
