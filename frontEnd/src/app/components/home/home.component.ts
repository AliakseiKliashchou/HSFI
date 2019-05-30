import { Component, OnInit,  Directive, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
formattedAddres = '';
options = {
  componentRestrictions : {
    //country: ['BY']
  }
}
  constructor(private _router: Router,  private NgZone: NgZone, private elRef: ElementRef,  private http: HttpClient,) {
    
   }  
  

  ngOnInit() {    
    this.http.get('http://localhost:3000/getAdminData', this.httpOptions).subscribe((data: any) => {   
      console.log(data[0]);      
      for(let i = 0; i < data[0].countries.length; i++){
        this.countries[i] = data[0].countries[i];        
      }
      for(let i = 0; i < data[0].foodGroups.length; i++){
        this.foodGroups[i] = data[0].foodGroups[i];
      }
      for(let i = 0; i < data[0].organizations.length; i++){
        this.organizations[i] = data[0].organizations[i];
      }
      for(let i = 0; i < data[0].questions.length; i++){
        this.questions[i] = data[0].questions[i];
      }
      
  });
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };

  countries = [];
  foodGroups = [];
  organizations = [];
  questions = [];

  saveCounrtyChangesBtn = false;
  saveFoodGroupChangesBtn = false;
  saveOrganizationChangesBtn = false;
  saveQuestionChangesBtn = false;
//************************ADMIN PANEL********************* */
//---------------Country-------------------------------------
  newCountry(country){
    this.countries.push(country);
    this.saveCounrtyChangesBtn = true;
  }
  delete_country(i){
    this.countries.splice(i, 1);
    this.saveCounrtyChangesBtn = true;
  }
  saveCountry(){    
    this.http.post('http://localhost:3000/changeAdminData', {target: 'countries', countries: this.countries}, this.httpOptions).subscribe((data: any) => {        
        console.log(data);   
  });
  }
//----------------------Food group----------------------------------------------
newFoodGroup(foodGroup){
  this.foodGroups.push(foodGroup);
  this.saveFoodGroupChangesBtn = true;
}
delete_foodGroup(i){
  this.foodGroups.splice(i, 1);
  this.saveFoodGroupChangesBtn = true;
}
saveFoodGroup(){
  this.http.post('http://localhost:3000/changeAdminData', {target: 'foodGroups', foodGroups: this.foodGroups}, this.httpOptions).subscribe((data: any) => {        
        console.log(data);   
  });
}
//----------------------Organization----------------------------------------------
newOrganization(organization){
  this.organizations.push(organization);
  this.saveOrganizationChangesBtn = true;
}
delete_organization(i){
  this.organizations.splice(i, 1);
  this.saveOrganizationChangesBtn = true;
}
saveOrganization(){
  this.http.post('http://localhost:3000/changeAdminData', {target: 'organizations', organizations: this.organizations}, this.httpOptions).subscribe((data: any) => {        
        console.log(data);   
  });
}
//----------------------Questions---------------------------------------------------
newQuestion(question){
  this.questions.push(question);
  this.saveQuestionChangesBtn = true;
}
delete_question(i){
  this.questions.splice(i, 1);
  this.saveQuestionChangesBtn = true;
}
saveQuestion(){
  this.http.post('http://localhost:3000/changeAdminData', {target: 'questions', questions: this.questions}, this.httpOptions).subscribe((data: any) => {        
        console.log(data);   
  });
}
//*************************************************************************** */
  public handleAddressChange(address: any){
    this.formattedAddres = address.formatted_address;
    let str = address.formatted_address.split(',');    
    console.log(str[1]);
    
  }

  userStatus = localStorage.getItem('userStatus');

  goToVendorRegistrationDesk(){
    this._router.navigate(['vendorregistrationDesk']);
  }

  goToScratchCardDesk(){
    this._router.navigate(['scratchCardDesk']);
  }
  goToHotline(){
    this._router.navigate(['hotline']);
  }

  goToInspectionDesk(){
    this._router.navigate(['inspectionDesk']);
  }
  goToReport(){
    this._router.navigate(['report']);
  }

}
