import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicsComponent } from './pages/medics/medics.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicConsultationsComponent } from './pages/medic-consultations/medic-consultations.component';
import {RoleGuard} from './services/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/medicos', component: MedicsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { path: 'medico/consultas', component: MedicConsultationsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { path: '', redirectTo: 'admin/medicos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
