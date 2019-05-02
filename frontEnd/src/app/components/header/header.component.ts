import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private _router: Router) { }

  ngOnInit() {  
    
  }


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

}
