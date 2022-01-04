import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from "./patient/patient.component";


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "http://localhost:8080/api/v1/patients";

  constructor(private httpClient: HttpClient) {
  }

  getPatientsList(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.baseURL}`);
  }

  createPatient(patient: Patient): Observable<Object> {
    return this.httpClient.post(`${this.baseURL} `, patient);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseURL}/${id}`);
  }

  updatePatient(id: number, patient: Patient): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, patient);
  }

  deletePatient(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
