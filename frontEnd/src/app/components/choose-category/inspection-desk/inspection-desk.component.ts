import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { APIserviceService } from 'src/app/services/apiservice.service';

import * as _moment from 'moment';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-inspection-desk',
  templateUrl: './inspection-desk.component.html',
  styleUrls: ['./inspection-desk.component.css'],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class InspectionDeskComponent implements OnInit {
  date = new FormControl(moment());
  modalRef: BsModalRef;
  constructor(private http: HttpClient, private modalService: BsModalService, private _snackBar: MatSnackBar, private HTTP: APIserviceService) { }

  ngOnInit() {
    let day = this.date.value._d.toString();    
    let day2 = day.split(' ', 3);    
    this.currentDay = day2[0];    
    this.HTTP.getAllVendors().subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        this.vendorsArrayMap.push(data[i]);
      }      
  });
  this.HTTP.getAdminData().subscribe((data: any) => {            
      for(let i = 0; i < data[0].countries.length; i++){
        this.countries[i] = data[0].countries[i];        
      }
      for(let i = 0; i < data[0].foodGroups.length; i++){
        this.foodGroups[i] = data[0].foodGroups[i];        
      }
      for(let i = 0; i < data[0].questions.length; i++){
        this.questions[i] = data[0].questions[i];        
      }
     
  });

  } 

  countries = [];
  foodGroups = [];
  currentDay = '';
  openClosedStatus = '';
  userName = localStorage.getItem('userName');
  isShowProgressBar = false;
  latitude = 53.54;
  longitude = 27.30;

  questions = [];
  ossResult = [];

  toggle = false;
  vendor: {[k: string]: any} = {};
  vendorOnInspection = {
    name:'',  
    oss: 0,
    stars: 0,  
  };  
  vendorsArray = [];
  vendorsArrayMap = [];

  isShowFindVendor = false;
  isShowNameBtn = false;
  isShowLicenceBtn = false;
  isShowPhoneBtn = false;
  isShowEmailBtn = false;
  isShowCountryBtn = false;
  isShowFoodgroupBtn = false;
  isShowOssBtn = false;
  isShowChangesBtn = false;

  nameBtn = '&#9998';
  licenceBtn = '&#9998';
  phoneBtn = '&#9998';
  emailBtn = '&#9998';
  countryBtn = '&#9998';
  foodGroupBtn = '&#9998';
  ossBtn = '&#9998';

  nameDisable = true;
  licenceDisable = true;
  phoneDisable = true;
  emailDisable = true;
  countryDisable = true;
  foodGroupDisable = true;
  ossDisable = true;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalMap(mapModal: TemplateRef<any>){
    this.modalRef = this.modalService.show(mapModal);
  }

  toggler(){
    this.toggle = !this.toggle;   
  }
//------------------FORM REQUEST TO SERVER----------------------------

  showVendor( country, openClosed, foodGroup, oss, yes, no, stars){
  //---------------collect all data in request object-------------   
  this.isShowProgressBar = true;
  this.vendorsArray = [];  
    if(country){                            //
      this.vendor.country = country;        //
    }                                       //
                                          // 
    if(openClosed){                         //
      this.openClosedStatus = openClosed;  //
    }                                       //
    if(foodGroup){                          //
      this.vendor.foodGroup = foodGroup;    //
    }                                       //
    if(oss){                                //
      this.vendor.oss = oss;                //
    }                                       //
    if(yes.checked){                        //
      this.vendor.wasFlag = yes.value;      //     
    } 
    if(no.checked){                         //
      this.vendor.wasFlag = no.value;       //     
    }                                       //
    if(stars){                              //
      this.vendor.stars = stars;            //
    }                                       //
    //--------------------------------------//    
    this.HTTP.viewVendorWithQuery(this.openClosedStatus, this.currentDay, this.vendor).subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        this.vendorsArray.push(data[i]);
      }     
      this.isShowProgressBar = false;
  });

  }

  //---------------VIEW VENDOR PROFILE AND CHANGE INFO---------------
  changeName(name, i){                      //
    this.nameDisable = !this.nameDisable;   //
    this.nameBtn = 'Ok';                    //
    this.isShowChangesBtn = true;           //
    if(this.nameDisable){                   //     
      this.nameBtn = '&#9998';              //
      this.vendorsArray[i].name = name;     //     
    }                                       //
  }                                         //
  changeNameMap(name, i){                   //
    this.nameDisable = !this.nameDisable;   //
    this.nameBtn = 'Ok';                    //
    this.isShowChangesBtn = true;           //
    if(this.nameDisable){                   //     
      this.nameBtn = '&#9998';              //
      this.vendorsArrayMap[i].name = name;  //     
    }                                       //
  }                                         //
//////////////////////////////////////////////
  changeLicenceNumber(licenceNumber, i){       ////////////////
    this.licenceDisable = !this.licenceDisable;             //
    this.licenceBtn = 'Ok';                                 //
    this.isShowChangesBtn = true;                           //
    if(this.licenceDisable){                                //    
      this.licenceBtn = '&#9998';                           //
      this.vendorsArray[i].licenceNumber = licenceNumber;   //     
    }                                                       //
  }                                                         //
  changeLicenceNumberMap(licenceNumber, i){                 //
    this.licenceDisable = !this.licenceDisable;             //
    this.licenceBtn = 'Ok';                                 //
    this.isShowChangesBtn = true;                           //
    if(this.licenceDisable){                                //     
      this.licenceBtn = '&#9998';                           //
      this.vendorsArrayMap[i].licenceNumber = licenceNumber;//      
    }                                                       //
  }                                                         //
//////////////////////////////////////////////////////////////
  changePhone(phone, i){                    //  
    this.phoneDisable = !this.phoneDisable; //
    this.phoneBtn = 'Ok';                   //
    this.isShowChangesBtn = true;           //
    if(this.phoneDisable){                  //
      this.phoneBtn = '&#9998';             //
      this.vendorsArray[i].phone = phone;   //     
    }                                       //
  }                                         //
  changePhoneMap(phone, i){                 //   
    this.phoneDisable = !this.phoneDisable; //
    this.phoneBtn = 'Ok';                   //
    this.isShowChangesBtn = true;           //
    if(this.phoneDisable){                  //
      this.phoneBtn = '&#9998';             //
      this.vendorsArrayMap[i].phone = phone;//     
    }                                       //
  }                                         //
  ////////////////////////////////////////////
  changeEmail(email, i){                    //
    this.emailDisable = !this.emailDisable; //
    this.emailBtn = 'Ok';                   //
    this.isShowChangesBtn = true;           //
    if(this.emailDisable){                  //
      this.emailBtn = '&#9998';             //
      this.vendorsArray[i].email = email;   //     
    }                                       //
  }                                         //
  changeEmailMap(email, i){                 //
    this.emailDisable = !this.emailDisable; //
    this.emailBtn = 'Ok';                   //
    this.isShowChangesBtn = true;           //
    if(this.emailDisable){                  //
      this.emailBtn = '&#9998';             //
      this.vendorsArrayMap[i].email = email;//     
    }                                       //
  }                                         //
  ////////////////////////////////////////////////
  changeCountry(country, i){                    // 
    this.countryDisable = !this.countryDisable; //
    this.countryBtn = 'Ok';                     // 
    this.isShowChangesBtn = true;               //
    if(this.countryDisable){                    //
      this.countryBtn = '&#9998';               //
      this.vendorsArray[i].country = country;   //     
    }                                           //
  }                                             //
  changeCountryMap(country, i){                 //
    this.countryDisable = !this.countryDisable; //
    this.countryBtn = 'Ok';                     //
    this.isShowChangesBtn = true;               //
    if(this.countryDisable){                    //
      this.countryBtn = '&#9998';               //
      this.vendorsArrayMap[i].country = country;//     
    }                                           //
  }                                             //
//////////////////////////////////////////////////////
  changeFoodgroup(foodGroup, i){                    //
    this.foodGroupDisable = !this.foodGroupDisable; //
    this.foodGroupBtn = 'Ok';                       //      
    this.isShowChangesBtn = true;                   //
    if(this.foodGroupDisable){                      //
      this.foodGroupBtn = '&#9998';                 //
      this.vendorsArray[i].foodGroup = foodGroup;   //     
    }                                               //
  }                                                 //
  changeFoodgroupMap(foodGroup, i){                 //
    this.foodGroupDisable = !this.foodGroupDisable; //
    this.foodGroupBtn = 'Ok';                       //  
    this.isShowChangesBtn = true;                   //
    if(this.foodGroupDisable){                      //
      this.foodGroupBtn = '&#9998';                 //
      this.vendorsArrayMap[i].foodGroup = foodGroup;//      
    }                                               //
  }                                                 //
//////////////////////////////////////////////////////
  changeOss(oss, i){                        //
    this.ossDisable = !this.ossDisable;     //
    this.ossBtn = 'Ok';                     //
    this.isShowChangesBtn = true;           //
    if(this.ossDisable){                    //
      this.ossBtn = '&#9998';               //
      this.vendorsArray[i].oss = oss;       //      
    }                                       //
  }                                         //
  changeOssMap(oss, i){                     //    
    this.ossDisable = !this.ossDisable;     //
    this.ossBtn = 'Ok';                     //    
    this.isShowChangesBtn = true;           //
    if(this.ossDisable){                    //
      this.ossBtn = '&#9998';               //
      this.vendorsArrayMap[i].oss = oss;    //      
    }                                       //
  }                                         //
//////////////////////////////////////////////////////////////////////////////////////
  saveChanges(i){                                                                   //                                        
    this.isShowProgressBar = true;                                                  // 
    this.HTTP.changeVendorProfile(this.vendorsArray[i]).subscribe((data: any) => {  //      
      this._snackBar.open('Profile was changed','', {                               //
        duration: 2000,                                                             //
      });                                                                           // 
      this.isShowChangesBtn = false;                                                //    
      this.isShowProgressBar = false;                                               // 
  });                                                                               // 
  }                                                                                 // 
  saveChangesMap(i){                                                                //  
    this.isShowProgressBar = true;                                                  //   
    this.HTTP.changeVendorProfile(this.vendorsArrayMap[i]).subscribe((data: any) =>{//     
      this._snackBar.open('Changes was saved','', {                                 //
        duration: 2000,                                                             //
      });                                                                           // 
      this.isShowChangesBtn = false;                                                //
      this.isShowProgressBar = false;                                               // 
  });                                                                               // 
  }                                                                                 // 
//----------------------------------------------------------------------------------// 
  
  markerMove(event, i){
    this.isShowChangesBtn = true; 
    this.vendorsArrayMap[i].latitude = event.coords.lat;
    this.vendorsArrayMap[i].longitude = event.coords.lng;     
    this.HTTP.changeVendorProfile(this.vendorsArrayMap[i]).subscribe((data: any) => {      
      this._snackBar.open('Changes was successfully saved','', {
        duration: 2000,
      }); 
      this.isShowChangesBtn = false;      
  });
  }
//------Make OSS and push it into DB----------------//
  ossYes(yes, i){                                   //
    if(yes.checked){                                //
      let value = +yes.value;                       //
      this.ossResult[i] = value;                    //  
    }                                               //
  }                                                 //
  ossNo(no, i){                                     //
    if(no.checked){                                 //
      let value = +no.value;                        //
      this.ossResult[i] = value;                    //
    }                                               //
  }                                                 //
  overal_safety_score(){                            //
    this.isShowChangesBtn = true;                   //
    let accum = 0;                                  //
    for(let i = 0; i < this.ossResult.length; i++){ //
      accum += this.ossResult[i];                   //
    }                                               //
    if(accum < 0){                                  //
      this.vendorOnInspection.stars--;              //
    }                                               //
    this.vendorOnInspection.oss = accum;            //
                                                    //
    this.HTTP.changeVendorProfile(this.vendorOnInspection).subscribe((data: any) => {                                                   
      this._snackBar.open('Changes was successfully saved','', {
        duration: 2000,                             //  
      });                                           //
      this.isShowChangesBtn = false;                //                                       
  });                                               //
  }                                                 //
//--------------------------------------------------//  
findVendor(licenceNumberFind){  
  this.isShowChangesBtn = true;  
 this.HTTP.getVendor(licenceNumberFind).subscribe((data: any) => {
      if(data){
        this.vendorOnInspection = data.vendor;      
        this.isShowFindVendor = true;
      }else this._snackBar.open('Vendor not found','', {
        duration: 2000,
      });;   
      this.isShowChangesBtn = false; 
  });
}

}
