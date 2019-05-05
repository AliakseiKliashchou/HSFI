import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fao-profile',
  templateUrl: './fao-profile.component.html',
  styleUrls: ['./fao-profile.component.css']
})
export class FaoProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const userEmail = { email : localStorage.getItem('userName')};    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/viewProfile', userEmail, httpOptions).subscribe((data: any) => {
      console.log(data.user.name);
      this.user.name = data.user.name;
      this.user.email = data.user.email;
      this.user.country = data.user.country;
      this.user.phone = data.user.phone;     
    });
  }

   //-----------NEW USER---------------
   user = {
    name: '',
    email: '',
    country: '',
    phone: '', 
    password: ''
  };
  //----------------------------------
  

  //disables--------------  //
  disableName     = true;   //
  disableEmail    = true;   //
  disableCountry  = true;   //
  disablePhone    = true;   //     
  //------------------------//

  //ngIf----------------------- //
  confirmNameBtn      = false;  //
  confirmEmailBtn     = false;  //
  confirmCountryBtn   = false;  //
  confirmPhoneBtn     = false;  //  
  saveChangesBtn      = false;  // 
  changePasswordBtn   = false;  //
  //----------------------------//

 

  //********************************************FUNCTIONS**************************************** */

  //---------NAME-----------------//
  changeName(){                   //
    this.confirmNameBtn = true;   //
    this.disableName    = false;  //
    this.saveChangesBtn = true;   //
  }                               //
  confirmNameChanges(newName){    //
    this.confirmNameBtn = false;  //
    this.disableName    = true;   //
    console.log(newName);         //
    this.user.name = newName;  //
  }                               //
  //------------------------------//

  //---------EMAIL----------------//
  changeEmail(){                  //
    this.confirmEmailBtn  = true; //
    this.disableEmail     = false;//
    this.saveChangesBtn   = true; //
  }                               //
  confirmEmailChanges(newEmail){  //
    this.confirmEmailBtn  = false;//
    this.disableEmail     = true; //
    console.log(newEmail);        //
    this.user.email = newEmail;//
  }                               //
  //------------------------------//

  //----------COUNTRY---------------//
  changeCountry(){                  //
    this.disableCountry     = false;//
    this.confirmCountryBtn  = true; //
    this.saveChangesBtn     = true; //
  }                                 //
  confirmCountryChanges(newCountry){//
    this.disableCountry     = true; //
    this.confirmCountryBtn  = false;//
    console.log(newCountry);        //
    this.user.country = newCountry;//
  }                                 //    
  //------------------------------- //

  //--------PHONE----------------//
  changePhone(){                 //
    this.disablePhone    = false;//
    this.confirmPhoneBtn = true; //
    this.saveChangesBtn  = true; //
  }                              //
  confirmPhoneChanges(newPhone){ //
    this.disablePhone    = true; //
    this.confirmPhoneBtn = false;//
    console.log(newPhone);       //
    this.user.phone = newPhone;//
  }                              //   
  //-----------------------------//

  //--------PASSWORD------------------//
  changePassword(){
    this.changePasswordBtn   = true;
    this.saveChangesBtn  = true;
  }



  //----------------------------------//     

  saveChanges(password_1, password_2){
    console.log(password_1);
    
    if(this.changePasswordBtn){      
      if((password_1 == password_2) && (password_1 == '')){        
        this.user.password = password_1;
        delete this.user.password;
        console.log(this.user);
      }
    } else if(password_1 !== ''){      
      console.log(this.user);
    }
  }

}
