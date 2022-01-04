import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from "../doctor.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DoctorService} from "../../doctor.service";

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {

  progress: boolean = false;
  doctorForm!: FormGroup;
  error: boolean = false;

  @Input() doctor: Doctor | null | undefined = null;
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor(
    private formBuilder: FormBuilder,
    private doctorService:DoctorService,
    private router: Router
  ) {

    this.doctorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      emailId:['',[Validators.required]],
      phone:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.name?.setValue(this.doctor?.name);
    this.description?.setValue(this.doctor?.description);
    this.emailId?.setValue(this.doctor?.emailId);
    this.phone?.setValue(this.doctor?.phone);
  }

  get name(): AbstractControl | null {
    return this.doctorForm.get('name');
  }

  get description(): AbstractControl | null {
    return this.doctorForm.get('description');
  }
  get emailId(): AbstractControl | null {
    return this.doctorForm.get('emailId');
  }
  get phone(): AbstractControl | null {
    return this.doctorForm.get('phone');
  }

  onSubmit() {
    console.log(this.doctor);
    this.saveDoctor();
  }

   saveDoctor() {
    this.error = false;
    if (this.doctorForm.valid) {
      if (!this.doctor) {
        this.doctorService.createDoctor(this.doctorForm.value).subscribe(
          response => {
            this.updated.emit(true);
          },
          error => {
            this.error = true;
          }
        );
      } else {
        this.doctorService.updateDoctor(this.doctor.id, this.doctorForm.value).subscribe(
          response => {
            this.updated.emit(true);
          }, error => {
            this.error = true;
          }
        );
      }
    }
  }
}
