import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIserviceService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {  }

  public getAdminData(){
    return this.http.get(`${this.URL}/getAdminData`, this.httpOptions);
  }
  /*public viewProfile(findField, value){
    return this.http.post(`${this.URL}/viewProfile`, {findField: value}, this.httpOptions)
  }*/
}
