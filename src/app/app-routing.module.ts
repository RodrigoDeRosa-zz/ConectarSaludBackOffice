import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicsComponent } from './pages/medics/medics.component';
import {LoginComponent} from './pages/login/login.component';
import {RoleGuard} from './services/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'medics', component: MedicsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { path: '', redirectTo: '/medics', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
