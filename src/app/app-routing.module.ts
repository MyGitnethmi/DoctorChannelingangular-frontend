import {NgModule} from '@angular/core';
import {ServicesComponent} from "./home/services/services.component";
import {HomeComponent} from "./home/home.component";
import {DoctorComponent} from "./home/doctor/doctor.component";
import {PatientComponent} from "./home/patient/patient.component";
import {AppoinmentComponent} from "./home/appoinment/appoinment.component";
import {RouterModule, Routes} from "@angular/router";
import {CreatePatientComponent} from "./home/patient/create-patient/create-patient.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ServicesComponent
      },
      {
        path: 'doctor',
        component: DoctorComponent
      },
      {
        path: 'appoinment',
        component: AppoinmentComponent
      },
      {
        path: 'patient',
        component: PatientComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
