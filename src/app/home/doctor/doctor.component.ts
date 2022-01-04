import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../doctor.service";

export interface Doctor {
  id: number;
  name: string;
  description: string;
  emailId: string;
  phone: number;

}
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  toggle: boolean = false;
  doctors: Doctor[] | undefined;
  doctor?: Doctor | null;

  constructor(
    private doctorService:DoctorService
  ) { }

  ngOnInit(): void {
    this.toggle = false;
    this.getDoctors()
  }

  createDoctor() {
    this.toggle = !this.toggle;
    this.doctor = null;
  }
   getDoctors() {
    this.doctorService.getDoctortsList().subscribe(data=>{
      this.doctors = data;
    });
  }

  updateDoctor(doctor: Doctor) {
    console.log(doctor);
    this.toggle = !this.toggle;
    this.doctor = doctor;
  }
  updated(event: boolean): void {
    if (event) {
      this.ngOnInit();
    }
  }

  deleteDoctor(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.doctorService.deleteDoctor(id).subscribe(data => {
        console.log(data);
        this.getDoctors();
      });
    }
  }
}
