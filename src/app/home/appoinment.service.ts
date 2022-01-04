import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "./patient/patient.component";
import {Appoinment} from "./appoinment/appoinment.component";

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {

  private baseURL = "http://localhost:8080/api/v1/appoinments";
  constructor(private httpClient: HttpClient) { }

  getAppoinmentsList(): Observable<Appoinment[]>{
    return this.httpClient.get<Appoinment[]>(`${this.baseURL}`);
  }
  createAppoinment(appoinment:Appoinment ): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,appoinment );
  }
  getAppoinmentById(id: number): Observable<Appoinment>{
    return this.httpClient.get<Appoinment>(`${this.baseURL}/${id}`);
  }
  updateAppoinment(id: number, appoinment: Appoinment): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, appoinment);
  }
  deleteAppoinment(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
