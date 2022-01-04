import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Appoinment} from "../appoinment.component";
import {Router} from "@angular/router";
import {AppoinmentService} from "../../appoinment.service";

@Component({
  selector: 'app-create-appoinment',
  templateUrl: './create-appoinment.component.html',
  styleUrls: ['./create-appoinment.component.css']
})
export class CreateAppoinmentComponent implements OnInit {

  progress: boolean = false;
  appoinmentForm!: FormGroup;
  error: boolean = false;

  @Input() appoinment: Appoinment | null | undefined = null;
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private appoinmentService:AppoinmentService,
    private router: Router
  ) {

    this.appoinmentForm = this.formBuilder.group({
      doctorname:['',[Validators.required]],
      patientname:['',[Validators.required]],
      phone:['',[Validators.required]],
      appoinmentnumber:['',[Validators.required]],
      date:['',[Validators.required]],
      time:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.doctorname?.setValue(this.appoinment?.doctorname);
    this.patientname?.setValue(this.appoinment?.patientname);
    this.phone?.setValue(this.appoinment?.phone);
    this.appoinmentnumber?.setValue(this.appoinment?.appoinmentnumber);
    this.time?.setValue(this.appoinment?.time);
    this.date?.setValue(this.appoinment?.date);
  }
  get doctorname(): AbstractControl | null {
    return this.appoinmentForm.get('doctorname');
  }
  get patientname(): AbstractControl | null {
    return this.appoinmentForm.get('patientname');
  }
  get phone(): AbstractControl | null {
    return this.appoinmentForm.get('phone');
  }
  get appoinmentnumber(): AbstractControl | null {
    return this.appoinmentForm.get('appoinmentnumber');
  }
  get time():AbstractControl | null{
    return this.appoinmentForm.get('time');
  }
  get date():AbstractControl| null{
    return this.appoinmentForm.get('date');
  }

  saveAppoinment() {
    this.error = false;
    const  appointment = this.appoinmentForm.value;
    appointment.time = appointment.time.substring(0, 5) + ':00';
    console.log(appointment);
    if (this.appoinmentForm.valid) {
      if (!this.appoinment) {
        this.appoinmentService.createAppoinment(appointment).subscribe(
          response => {
            this.updated.emit(true);
          },
          error => {
            this.error = true;
          }
        );
      } else {
        this.appoinmentService.updateAppoinment(this.appoinment.id, appointment).subscribe(
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
