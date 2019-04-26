import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username;
password;
  constructor(private androidPermissions: AndroidPermissions,private router: Router,private menuCtrl: MenuController) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    
    
    this.menuCtrl.enable(false)
    
  }

  signin(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => {
        if(result.hasPermission == false){
            alert("In order to find the nearest retaurant we need you to allow access location")
            
        }
        this.router.navigate(['home']);
      }
      
    );
    
    
  }

}
