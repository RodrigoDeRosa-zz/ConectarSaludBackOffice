import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from'./providers/app-config.service';

import { CustomMatPaginator } from './classes/custom-mat-paginator';

import { ABMGenericAbmComponent } from './components/generic-abm/generic-abm.component';
import { ABMGenericFormComponent } from './components/generic-form/generic-form.component';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import {TableFilteredComponent} from './components/table-filtered/table-filtered.component';

import { MedicsComponent } from './pages/medics/medics.component';
import { DailyAndHourlyRangeComponent } from './components/daily-and-hourly-range/daily-and-hourly-range.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicConsultationsComponent } from './pages/medic-consultations/medic-consultations.component';
import { PescriptionAndIndicationComponent } from './pages/pescription-and-indication/pescription-and-indication.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicHistoryComponent } from './pages/medic-history/medic-history.component';

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    MedicsComponent,
    ABMGenericAbmComponent,
    ABMGenericFormComponent,
    LayoutContainerComponent,
    TableFilteredComponent,
    DailyAndHourlyRangeComponent,
    LoginComponent,
    MedicConsultationsComponent,
    PescriptionAndIndicationComponent,
    HomeComponent,
    MedicHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ AppConfigService ],
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginator
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
