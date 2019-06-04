import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private _router: Router, private http: HttpClient,) { }

  ngOnInit() {  
    console.log('init header comp');
    if(localStorage.getItem('role') == 'fao'){
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      };
      this.http.get('http://localhost:3000/getNewNpc', httpOptions).subscribe((data: any) => {
        console.log(data);
        if(data.length > 0){
          this.badgeValue = data.length;
          this.isShowBadge = false;
        }else{
          this.badgeValue = 0;
          this.isShowBadge = true;
        }
        
    });
    }
    if(localStorage.getItem('role') == 'npc'){
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      };
      this.http.get(`http://localhost:3000/getNewOperator?email=${localStorage.getItem('userName')}`, httpOptions).subscribe((data: any) => {
        console.log(data);
        if(data.length > 0){
          this.badgeValue = data.length;
          this.isShowBadge = false;
        }else{
          this.badgeValue = 0;
          this.isShowBadge = true;
        }
        
    });
    }
   
  }
  badgeValue = 0;
  isShowBadge = true;

  isLogin = Boolean(localStorage.getItem('userStatus'));  
  name = localStorage.getItem('userName');
  
  setName(event){
    this.name = event.name;
    this.isLogin = event.isLogin;
    console.log('пришло');
  }

  goHome(){
    this._router.navigate(['/']);
  }

  goProfile(){
    if(localStorage.getItem('role') == 'fao' ){
      this._router.navigate(['/fao_profile']);
    }
    if(localStorage.getItem('role') == 'npc'){
      this._router.navigate(['/npc_profile']);
    }
    if(localStorage.getItem('role') == 'operator'){
      this._router.navigate(['/operators_profile']);
    }    
  }

  goAcception(){
    if(localStorage.getItem('role') == 'fao'){
      this._router.navigate(['/npc-acception']);
    }
    if(localStorage.getItem('role') == 'npc'){
      this._router.navigate(['/operator-acception']);
    }
    
  }

}
