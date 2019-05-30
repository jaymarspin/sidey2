import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GlobalService } from './global/global.service';
import {PostService} from './post/post.service'
 
import { AuthService } from './authentication/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    // { 
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    {
      title: 'Profile',
      url: '/list',
      icon: 'person'
    },
    {
      title: 'Add a Place',
      url: '/placeadd',
      icon: 'beer'
    },
    {
      title: 'My Place(s)',
      url: '/myplace',
      icon: 'beer'
    }


  ];

  constructor(private post:PostService,private router: Router,private global:GlobalService,private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthService,
  ) {

 
  }
  signOut(){
    let data:any
    this.storage.get('id').then((res)=>{
      data = {
        id: res
      }
    })
    
        this.global.presentLoading("Please Wait").then(()=>{
          this.post.postData(data,"logout.php").subscribe((Response) =>{
            
            // console.log(Response)
          },(e)=>{
            this.global.presentToast("Error Occured! try again later")
            this.global.loading.dismiss()
          },()=>{
            this.storage.remove('fname');
            this.storage.remove('lname');
            this.storage.remove('contact');
            this.storage.remove('birthdate');
            this.storage.remove('username');
            this.storage.remove('password');
            this.storage.remove('id');
            this.authenticationService.logout()
            this.router.navigate(['login']);
            this.global.loading.dismiss()
          })
        })
          
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });



    });

    
  }
}
