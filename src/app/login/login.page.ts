import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username;
password;
  constructor(private router: Router,private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false)
  }

  signin(){
    
    this.router.navigate(['home']);
    
  }

}
