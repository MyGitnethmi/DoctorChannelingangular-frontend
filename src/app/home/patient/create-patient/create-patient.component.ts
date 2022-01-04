import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient, PatientComponent} from "../patient.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  progress: boolean = false;
  patientForm!: FormGroup;
  error: boolean = false;

 @Input() patient: Patient | null | undefined = null;
 @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor(
    private formBuilder: FormBuilder,
    private patientService:PatientService,
    private router: Router
  ) {
    this.patientForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId:['',[Validators.required]],
      phone:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.firstName?.setValue(this.patient?.firstName);
    this.lastName?.setValue(this.patient?.lastName);
    this.emailId?.setValue(this.patient?.emailId);
    this.phone?.setValue(this.patient?.phone);

  }
  savePatient() {
    this.error = false;
    if (this.patientForm.valid) {
      if (!this.patient) {
        this.patientService.createPatient(this.patientForm.value).subscribe(
          response => {
            this.updated.emit(true);
          },
          error => {
            this.error = true;
          }
        );
      } else {
        this.patientService.updatePatient(this.patient.id, this.patientForm.value).subscribe(
          response => {
            this.updated.emit(true);
          }, error => {
            this.error = true;
          }
        );
      }
    }
  }

  get firstName(): AbstractControl | null {
    return this.patientForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.patientForm.get('lastName');
  }
  get emailId(): AbstractControl | null {
    return this.patientForm.get('emailId');
  }
  get phone(): AbstractControl | null {
    return this.patientForm.get('phone');
  }


  onSubmit() {
      console.log(this.patient);
      this.savePatient();
  }


}
