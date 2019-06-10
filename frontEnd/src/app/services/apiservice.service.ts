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
  public viewProfile(value){
    return this.http.post(`${this.URL}/viewProfile`, {email: value}, this.httpOptions);
  }
  public changeAdminData(target, categ){
    if(target == 'countries'){
      return this.http.post(`${this.URL}/changeAdminData`, {target: target, countries: categ}, this.httpOptions);
    }
    if(target == 'foodGroups'){
      return this.http.post(`${this.URL}/changeAdminData`, {target: target, foodGroups: categ}, this.httpOptions);
    }
    if(target == 'organizations'){
      return this.http.post(`${this.URL}/changeAdminData`, {target: target, organizations: categ}, this.httpOptions);
    }
    if(target == 'questions'){
      return this.http.post(`${this.URL}/changeAdminData`, {target: target, questions: categ}, this.httpOptions);
    }
  }
  public login(user){
    return this.http.post(`${this.URL}/login`, user, this.httpOptions);
  }
  public viewProfileUser(user){
    return this.http.post(`${this.URL}/viewProfile`, user, this.httpOptions);
  }
  public getNewNpc(){
    return this.http.get(`${this.URL}/getNewNpc`, this.httpOptions);
  }
  public getNewOperator(user){
    return this.http.get(`${this.URL}/getNewOperator?email=${user}`, this.httpOptions);
  }
  public changeNewOperator(id, activity){
    return this.http.post(`${this.URL}/changeNewOperator`, {_id: id, activity: activity}, this.httpOptions);
  }
  public changeNewNpc(id, activity){
    return this.http.post(`${this.URL}/changeNewNpc`, {_id: id, activity: activity}, this.httpOptions);
  }
  public faoReg(user){
    return this.http.post(`${this.URL}/faoReg`, user, this.httpOptions);
  }
  public changeProfile(user){
    return this.http.post(`${this.URL}/changeProfile`, user, this.httpOptions);
  }
  public npcReg(user){
    return this.http.post(`${this.URL}/npcReg`, user, this.httpOptions);
  }
  public operatorReg(user){
    return this.http.post(`${this.URL}/operatorReg`, user, this.httpOptions);
  }
  public hotline(vendor){
    return this.http.post(`${this.URL}/hotline`, vendor, this.httpOptions);
  }
  public getAllVendors(){
    return this.http.get(`${this.URL}/getAllVendors`, this.httpOptions);
  }
  public viewVendorWithQuery(openClosedStatus, currentDay, vendor){
    return this.http.post(`${this.URL}/viewVendor?openClosedStatus=${openClosedStatus}&currentDay=${currentDay}`, vendor, this.httpOptions);
  }
  public changeVendorProfile(vendorsArray){
    return this.http.post(`${this.URL}/changeVendorProfile`, vendorsArray, this.httpOptions);
  }
  public getVendor(licenceNumber){
    return this.http.post(`${this.URL}/getVendor`, {licenceNumber: licenceNumber}, this.httpOptions);
  }
  public report(tasksToPush){
    return this.http.post(`${this.URL}/report`, tasksToPush, this.httpOptions);
  }
  public createVendorCard(vendorCardData){
    return this.http.post(`${this.URL}/createVendorCard`, vendorCardData, this.httpOptions);
  }
  public getOperator(email){
    return this.http.post(`${this.URL}/getOperator`, {email:email}, this.httpOptions);
  }
  public vendorRegistration(vendor){
    return this.http.post(`${this.URL}/vendorRegistration`, vendor, this.httpOptions);
  }
}
