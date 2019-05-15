import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inspection-desk',
  templateUrl: './inspection-desk.component.html',
  styleUrls: ['./inspection-desk.component.css']
})
export class InspectionDeskComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
  }

  toggle = false;
  vendor: {[k: string]: any} = {};
  vendorsArray = [];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

}
