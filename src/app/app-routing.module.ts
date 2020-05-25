import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RoleGuard} from './services/role.guard';

import { MedicsComponent } from './pages/medics/medics.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicConsultationsComponent } from './pages/medic-consultations/medic-consultations.component';
import { PescriptionAndIndicationComponent } from './pages/pescription-and-indication/pescription-and-indication.component';
import {HomeComponent} from './pages/home/home.component';

import {RoleConstants} from './constants/role.constants';
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/medicos', component: MedicsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: RoleConstants.ADMIN_ROLE
    }
  },
  { path: 'medico/consultas', component: MedicConsultationsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: RoleConstants.MEDIC_ROLE
    }
  },
  { path: 'medico/consultas/:id/receta-indicaciones', component: PescriptionAndIndicationComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: RoleConstants.MEDIC_ROLE
    }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
