import { Component} from '@angular/core';

import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  lat: any;
  long: any;


constructor(public router: Router,private statusBar: StatusBar,private androidFullScreen: AndroidFullScreen){

  
}
  

  ngOnInit(){
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => {
      this.androidFullScreen.showSystemUI()
    })
    
    this.statusBar.overlaysWebView(true);

// set status bar to white
    this.statusBar.backgroundColorByHexString('#ba8c16');
  }
  events(){
    this.router.navigate(['home/events']);
  }
  listing(){
    this.router.navigate(['home']);
  }
}
