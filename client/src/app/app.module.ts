import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam/webcam.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

import { ImageUploadModule } from "angular2-image-upload";
import { MaterializeModule } from "angular2-materialize";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import 'materialize-css';

const appRoutes: Routes = [
  { path: 'patient/:_id', component: PatientDetailComponent },
  { path: 'patients', component: PatientListComponent },
  {
    path: '',
    redirectTo: '/patients',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    PatientListComponent,
    PatientDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ImageUploadModule.forRoot(),
    MaterializeModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
