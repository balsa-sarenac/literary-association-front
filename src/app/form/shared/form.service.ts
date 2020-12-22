import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient) { }

  getForm(processId:string){
    console.log('http get');
    return this.http.get(environment.api+'/form/get/'+processId);
  }

  submitForm(processId:string, data:any){
    return this.http.post<any>(environment.api+'/form/submit/'+processId, data);
  }
}
