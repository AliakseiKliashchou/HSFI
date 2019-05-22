import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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
  constructor(private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.get('http://localhost:3000/getAllVendors', httpOptions).subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        this.vendorsArrayMap.push(data[i]);
      }
      console.log(this.vendorsArrayMap);
  });

  } 

  userName = localStorage.getItem('userName');

  latitude = 53.54;
  longitude = 27.30;

  questions = [
    'Safety of sell point',
    'Quality of environment',
    'Quality of clothes',
    'Quality of products'
  ];
  ossResult = [];

  toggle = false;
  vendor: {[k: string]: any} = {};
  vendorOnInspection = {
    name:'',  
    oss: 0,
    stars: 0,  
  };
  //vendorOnInspection: {[k: string]: any} = {};
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
  showVendor( country, city, openClosed, foodGroup, oss, yes, no, stars){
  //---------------sober all data in request object-------------   
    if(country){                            //
      this.vendor.country = country;        //
    }                                       //
    if(city){                               //
      this.vendor.city = city;              //
    }                                       // 
    if(openClosed){                         //
      this.vendor.openClosed = openClosed;  //
    }                                       //
    if(foodGroup){                          //
      this.vendor.foodGroup = foodGroup;    //
    }                                       //
    if(oss){                                //
      this.vendor.oss = oss;                //
    }                                       //
    if(yes.checked){                        //
      this.vendor.wasFlag = yes.value;      //
    }else if(no.checked){                   //
      this.vendor.wasFlag = no.value;       //
    }                                       //
    if(stars){                              //
      this.vendor.stars = stars;            //
    }                                       //
    //--------------------------------------//
    console.log(this.vendor);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/viewVendor', this.vendor, httpOptions).subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        this.vendorsArray.push(data[i]);
      }
      console.log(this.vendorsArray);
  });

  }

  //---------------VIEW VENDOR PROFILE AND CHANGE INFO---------------
  changeName(name, i){                      //
    this.nameDisable = !this.nameDisable;   //
    this.nameBtn = 'Ok';                    //
    this.isShowChangesBtn = true;           //
    if(this.nameDisable){                   //
      //console.log(name);                  //
      this.nameBtn = '&#9998';              //
      this.vendorsArray[i].name = name;     //
      console.log(this.vendorsArray[i]);    //
    }                                       //
  }                                         //
  changeNameMap(name, i){                   //
    this.nameDisable = !this.nameDisable;   //
    this.nameBtn = 'Ok';                    //
    this.isShowChangesBtn = true;           //
    if(this.nameDisable){                   //
      //console.log(name);                  //
      this.nameBtn = '&#9998';              //
      this.vendorsArrayMap[i].name = name;  //
      console.log(this.vendorsArrayMap[i]); //
    }                                       //
  }                                         //
//////////////////////////////////////////////
  changeLicenceNumber(licenceNumber, i){       ////////////////
    this.licenceDisable = !this.licenceDisable;             //
    this.licenceBtn = 'Ok';                                 //
    this.isShowChangesBtn = true;                           //
    if(this.licenceDisable){                                //
      //console.log(name);                                  //
      this.licenceBtn = '&#9998';                           //
      this.vendorsArray[i].licenceNumber = licenceNumber;   //
      console.log(this.vendorsArray[i]);                    //
    }                                                       //
  }                                                         //
  changeLicenceNumberMap(licenceNumber, i){                 //
    this.licenceDisable = !this.licenceDisable;             //
    this.licenceBtn = 'Ok';                                 //
    this.isShowChangesBtn = true;                           //
    if(this.licenceDisable){                                //
      //console.log(name);                                  //
      this.licenceBtn = '&#9998';                           //
      this.vendorsArrayMap[i].licenceNumber = licenceNumber;//
      console.log(this.vendorsArrayMap[i]);                 //
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
      console.log(this.vendorsArray[i]);    //
    }                                       //
  }                                         //
  changePhoneMap(phone, i){                 //   
    this.phoneDisable = !this.phoneDisable; //
    this.phoneBtn = 'Ok';                   //
    this.isShowChangesBtn = true;           //
    if(this.phoneDisable){                  //
      this.phoneBtn = '&#9998';             //
      this.vendorsArrayMap[i].phone = phone;//
      console.log(this.vendorsArrayMap[i]); //
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
      console.log(this.vendorsArray[i]);    //
    }                                       //
  }                                         //
  changeEmailMap(email, i){                 //
    this.emailDisable = !this.emailDisable; //
    this.emailBtn = 'Ok';                   //
    this.isShowChangesBtn = true;           //
    if(this.emailDisable){                  //
      this.emailBtn = '&#9998';             //
      this.vendorsArrayMap[i].email = email;//
      console.log(this.vendorsArrayMap[i]); //
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
      console.log(this.vendorsArray[i]);        //
    }                                           //
  }                                             //
  changeCountryMap(country, i){                 //
    this.countryDisable = !this.countryDisable; //
    this.countryBtn = 'Ok';                     //
    this.isShowChangesBtn = true;               //
    if(this.countryDisable){                    //
      this.countryBtn = '&#9998';               //
      this.vendorsArrayMap[i].country = country;//
      console.log(this.vendorsArrayMap[i]);     //
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
      console.log(this.vendorsArray[i]);            //
    }                                               //
  }                                                 //
  changeFoodgroupMap(foodGroup, i){                 //
    this.foodGroupDisable = !this.foodGroupDisable; //
    this.foodGroupBtn = 'Ok';                       //  
    this.isShowChangesBtn = true;                   //
    if(this.foodGroupDisable){                      //
      this.foodGroupBtn = '&#9998';                 //
      this.vendorsArrayMap[i].foodGroup = foodGroup;//
      console.log(this.vendorsArrayMap[i]);         //
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
      console.log(this.vendorsArray[i]);    //  
    }                                       //
  }                                         //
  changeOssMap(oss, i){                     //    
    this.ossDisable = !this.ossDisable;     //
    this.ossBtn = 'Ok';                     //    
    this.isShowChangesBtn = true;           //
    if(this.ossDisable){                    //
      this.ossBtn = '&#9998';               //
      this.vendorsArrayMap[i].oss = oss;    //
      console.log(this.vendorsArrayMap[i]); //
    }                                       //
  }                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges(i){                                                                                                              // 
    const httpOptions = {                                                                                                      // 
      headers: new HttpHeaders({                                                                                               // 
        "Content-Type": "application/json",                                                                                    // 
        "Access-Control-Allow-Origin": "*"                                                                                     //   
      })                                                                                                                       //
    };                                                                                                                         // 
    this.http.post('http://localhost:3000/changeVendorProfile', this.vendorsArray[i], httpOptions).subscribe((data: any) => {  // 
      console.log(this.vendorsArray[i]);                                                                                       // 
      alert('Changes was successfully saved');                                                                                 // 
      this.isShowChangesBtn = false;                                                                                           // 
  });                                                                                                                          // 
  }                                                                                                                            // 
  saveChangesMap(i){                                                                                                           // 
    const httpOptions = {                                                                                                      //   
      headers: new HttpHeaders({                                                                                               // 
        "Content-Type": "application/json",                                                                                    //   
        "Access-Control-Allow-Origin": "*"                                                                                     // 
      })                                                                                                                       // 
    };                                                                                                                         //   
    this.http.post('http://localhost:3000/changeVendorProfile', this.vendorsArrayMap[i], httpOptions).subscribe((data: any) => {//
      console.log(this.vendorsArrayMap[i]);                                                                                    // 
      alert('Changes was successfully saved');                                                                                 // 
      this.isShowChangesBtn = false;                                                                                           // 
  });                                                                                                                          // 
  }                                                                                                                            // 
//-----------------------------------------------------------------------------------------------------------------------------//
  
  
  markerMove(event, i){
    this.vendorsArrayMap[i].latitude = event.coords.lat;
    this.vendorsArrayMap[i].longitude = event.coords.lng;
    console.log(this.vendorsArrayMap[i]);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeVendorProfile', this.vendorsArrayMap[i], httpOptions).subscribe((data: any) => {
      console.log(this.vendorsArrayMap[i]);
      alert('Changes was successfully saved');       
  });
  }
//------Make OSS and push it into DB----------------//
  ossYes(yes, i){                                   //
    if(yes.checked){                                //
      let value = +yes.value;                       //
      this.ossResult[i] = value;                    //  
      console.log(this.ossResult);                  //
    }                                               //
  }                                                 //
  ossNo(no, i){                                     //
    if(no.checked){                                 //
      let value = +no.value;                        //
      this.ossResult[i] = value;                    //
      console.log(this.ossResult);                  //
    }                                               //
  }                                                 //
  overal_safety_score(){                            //
    let accum = 0;                                  //
    for(let i = 0; i < this.ossResult.length; i++){ //
      accum += this.ossResult[i];                   //
    }                                               //
    if(accum < 0){
      this.vendorOnInspection.stars--;
      console.log(this.vendorOnInspection.stars);
    }                                                //
    this.vendorOnInspection.oss = accum;            //
    const httpOptions = {                           //
      headers: new HttpHeaders({                    //  
        "Content-Type": "application/json",         //
        "Access-Control-Allow-Origin": "*"          //  
      })                                            //    
    };                                              //
    this.http.post('http://localhost:3000/changeVendorProfile', this.vendorOnInspection, httpOptions).subscribe((data: any) => {
                                                    //
      alert('Changes was successfully saved');      // 
  });                                              //
  }                                                 //
//--------------------------------------------------//  
findVendor(licenceNumberFind){  
  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };  
  this.http.post('http://localhost:3000/getVendor', {licenceNumber: licenceNumberFind}, httpOptions).subscribe((data: any) => {
      if(data){
        this.vendorOnInspection = data.vendor;
          
       console.log(this.vendorOnInspection);
       this.isShowFindVendor = true;
      }else alert('Vendor is not found');   
  });
}

}
