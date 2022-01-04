import {Component, OnInit} from '@angular/core';
import {PatientService} from "../patient.service";


export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  phone: string;
  new?: boolean;
  updated?: boolean;

}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  toggle: boolean = false;

  patients: Patient[] | undefined;
  patient?: Patient | null;

  constructor(
    private patientService: PatientService
  ) {
  }

  ngOnInit(): void {
    this.toggle = false;
    this.getPatients();
  }

  updatePatient(patient: Patient) {
    this.toggle = !this.toggle;
    this.patient = patient;
  }

  updated(event: boolean): void {
    if (event) {
      this.ngOnInit();
    }
  }

  deletePatient(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.patientService.deletePatient(id).subscribe(data => {
        console.log(data);
        this.getPatients();
      });
    }
  }

  private getPatients() {
    this.patientService.getPatientsList().subscribe(data => {
      this.patients = data;
    });
  }

  createPatient() {
    this.toggle = !this.toggle;
    this.patient = null;
  }

}
