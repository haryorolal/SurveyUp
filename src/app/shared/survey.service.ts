import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient ) { }

  
  getData(){
    return this.http.get(environment.api);
    //return this.http.get(environment.api2);

  }



}
