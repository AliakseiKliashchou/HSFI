import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToFao(){
    this._router.navigate(['fao']);
  }
  
  goToNpc(){
    this._router.navigate(['npc']);
  }

  goToOperators(){
    this._router.navigate(['operators']);
  }
}
