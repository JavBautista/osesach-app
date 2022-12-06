import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http:HttpClient
  ) { }

  getCompanyInformation(){  
    return this.http.get<any>( `${URL}/api/company/get/info`);
  }//.getCompanyInformation
}
