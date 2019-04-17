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
import { TitleEditPageModule } from './moderate/title-edit/title-edit.module'
import { AddFoodPageModule } from './moderate/add-food/add-food.module'
import { EditSchedPageModule } from './moderate/edit-sched/edit-sched.module'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalmapPageModule,
    TitleEditPageModule,
    AddFoodPageModule,
    EditSchedPageModule
  
  ],
  providers: [ 
    StatusBar,
    PostService, 
    Geolocation,
    NativeGeocoder,
    Keyboard,
    SplashScreen,
    ImagePicker,
    File,
    Camera,
    WebView,
    AndroidFullScreen,
    Validators,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
  