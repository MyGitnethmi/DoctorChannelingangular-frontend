import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './home/patient/patient.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AppoinmentComponent } from './home/appoinment/appoinment.component';
import { ServicesComponent } from './home/services/services.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatePatientComponent } from './home/patient/create-patient/create-patient.component';
import { CreateDoctorComponent } from './home/doctor/create-doctor/create-doctor.component';
import { CreateAppoinmentComponent } from './home/appoinment/create-appoinment/create-appoinment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    AppoinmentComponent,
    ServicesComponent,
    CreatePatientComponent,
    CreateDoctorComponent,
    CreateAppoinmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
