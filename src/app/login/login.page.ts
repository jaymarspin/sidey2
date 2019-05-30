import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {GlobalService } from '../global/global.service'
import { Storage } from '@ionic/storage';
import {PostService} from '../post/post.service'
import { AuthService } from '../authentication/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as $ from "jquery";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username:any;
password:any;
  constructor(private fb: Facebook,private authService: AuthService,private post:PostService,private storage: Storage,private global:GlobalService,private androidPermissions: AndroidPermissions,private router: Router,private menuCtrl: MenuController) { }

  ngOnInit() {
    this.storage.get('username').then((val) => {
      if(val != null && val != ""){
        this.global.enter()
          this.router.navigate(['home']);
      }else{
        this.global.enter()
          this.router.navigate(['login']);
      }
    });
  }

  ionViewDidEnter(){
     
    this.authService.authenticationState.subscribe(state => {
      if (!state) {
        $("#container").fadeIn(500)
      } 
    });
    this.menuCtrl.enable(false)
    
  }

  signin(){

    if(this.password && this.username){
      let data = {
        username: this.username,
        password: this.password
      }
      this.global.presentLoading("Please Wait").then(()=>{
        this.post.postData(data,"login.php").subscribe((Response) =>{
          let res = Response.json() 
      
          if(res[0].message == "success"){
            this.storage.set('fname', res[0].fname);
            this.storage.set('lname', res[0].lname);
            this.storage.set('contact', res[0].contact);
            this.storage.set('birthdate', res[0].birthdate);
            this.storage.set('username', res[0].username);
            this.storage.set('password', res[0].password);
            this.storage.set('id', res[0].id);
            this.authService.login().then(()=>{
              this.global.enter()
              this.router.navigate(['home']);
            });
           
          }else{
            this.global.presentAlert("Username or Password is invalid, Please try again")
          }
        },(e) =>{
          this.global.loading.dismiss()
          this.global.presentAlert("Error Occured While Signing in")
        },()=>{
          this.global.loading.dismiss()
          
        })
      })
      
    }else{
      this.global.presentToast("Please don't leave a field(s) before proceeding")
    }
    
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
    //   result => {
    //     if(result.hasPermission == false){
    //         alert("In order to find the nearest retaurant we need you to allow access location")
            
    //     }
    //     this.global.enter()
    //     this.router.navigate(['home']);
    //   }
      
    // );
    
    
  }

  facebook(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));


  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }
    register(){
      this.router.navigate(['register']);
    }

}
