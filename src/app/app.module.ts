import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {PostService} from './post/post.service'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {ModalmapPageModule} from './modalmap/modalmap.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalmapPageModule
  ],
  providers: [
    StatusBar,
    PostService,
    Geolocation,
    NativeGeocoder,
    SplashScreen,
    AndroidFullScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
