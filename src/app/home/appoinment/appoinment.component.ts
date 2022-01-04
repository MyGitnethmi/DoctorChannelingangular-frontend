import { Component, OnInit } from '@angular/core';
import {AppoinmentService} from "../appoinment.service";
import {Time} from "@angular/common";



export interface Appoinment{
  id:number;
  doctorname:String;
  patientname:String;
  phone:number;
  appoinmentnumber:number;
  date:Date;
  time:Time;

}

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {


  toggle: boolean = false;
  appointments: Appoinment[] | undefined;
  appointment?: Appoinment | null;





  constructor(
    private appoinmentService: AppoinmentService
  ) {
  }

  ngOnInit(): void {
    this.toggle = false;
    this.getAppointments();
  }

  updateAppointment(appoinment: Appoinment) {
    this.toggle = !this.toggle;
    this.appointment = appoinment;
  }

  updated(event: boolean): void {
    if (event) {
      this.ngOnInit();
    }
  }

  deleteAppointment(id: number) {
    if (confirm("Are you sure you want to delete this appointment?")) {
      this.appoinmentService.deleteAppoinment(id).subscribe(data => {
        console.log(data);
        this.getAppointments();
      });
    }
  }

  getAppointments() {
    this.appoinmentService.getAppoinmentsList().subscribe(data => {
      this.appointments = data;
    });
  }

  createAppointment() {
    this.toggle = !this.toggle;
    this.appointment = null;
  }

}
