import { Component, OnInit,  Directive, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { APIserviceService } from 'src/app/services/apiservice.service';

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
  constructor(private _router: Router,  private http: HttpClient, private _snackBar: MatSnackBar, private HTTP: APIserviceService) {
    
  } 
  ngOnInit() {    
    this.HTTP.getAdminData().subscribe((data: any) => {          
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
    if(localStorage.getItem('role')=='fao' || localStorage.getItem('role')=='npc' ){     
      this.tasks.hotline = true;
      this.tasks.inspectionDesk = true;
      this.tasks.report = true;
      this.tasks.scratchCardDesk = true;
      this.tasks.vendorRegistrationDesk = true;

    }
    if(localStorage.getItem('role')=='fao'){
      this.faoStatus = true;
    }
    if(localStorage.getItem('role') == 'operator'){
      this.HTTP.viewProfile(localStorage.getItem('userName')).subscribe((data: any) => {
        for(let i = 0; i < data.user.task.length; i++){
          if(data.user.task[i] == 'Vendor registration'){
            this.tasks.vendorRegistrationDesk = true;
          }
          if(data.user.task[i] == 'Scratch card desk'){
            this.tasks.scratchCardDesk = true;
          }
          if(data.user.task[i] == 'Hotline'){
            this.tasks.hotline = true;
          }
          if(data.user.task[i] == 'Inspection'){
            this.tasks.inspectionDesk = true;
          }
          if(data.user.task[i] == 'Report'){
            this.tasks.report = true;
          }
        }
      });
    }
   
  }
  
  faoStatus = false;
  countries = [];
  foodGroups = [];
  organizations = [];
  questions = [];

  tasks = {
    vendorRegistrationDesk: false,
    scratchCardDesk: false,
    hotline: false,
    inspectionDesk: false,
    report: false
  }

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
    this.HTTP.changeAdminData('countries', this.countries).subscribe((data: any) => {        
        this._snackBar.open('Country list was changed','', {
          duration: 2000,
        });   
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
  this.HTTP.changeAdminData('foodGroups', this.foodGroups).subscribe((data: any) => {         
        this._snackBar.open('Food group list was changed','', {
          duration: 2000,
        });    
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
  this.HTTP.changeAdminData('organizations', this.organizations).subscribe((data: any) => {        
        this._snackBar.open('Organization list was changed','', {
          duration: 2000,
        });   
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
  this.HTTP.changeAdminData('questions', this.questions).subscribe((data: any) => {         
        this._snackBar.open('Question list was changed','', {
          duration: 2000,
        });   
  });
}
//*************************************************************************** */
  public handleAddressChange(address: any){
    this.formattedAddres = address.formatted_address;
    let str = address.formatted_address.split(',');      
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
