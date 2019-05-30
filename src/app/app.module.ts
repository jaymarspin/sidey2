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
import { CategoryPageModule } from './moderate/category/category.module'
import { EditSchedPageModule } from './moderate/edit-sched/edit-sched.module'
import {AddPhotoPageModule} from './moderate/add-photo/add-photo.module'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import {AlbumsPageModule} from './moderate/albums/albums.module'
import {MinfoPageModule} from './moderate/minfo/minfo.module'
import {MenuPageModule} from './moderate/menu/menu.module'


import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpClient,HttpClientModule } from '@angular/common/http'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {ViewmealPageModule} from './client/viewmeal/viewmeal.module'
import {ReviewsPageModule} from './client/reviews/reviews.module'
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import {MakereviewPageModule} from './client/makereview/makereview.module'
import { Ionic2RatingModule } from 'ionic2-rating'
import {RestoGalleryPageModule} from './client/resto-gallery/resto-gallery.module'
 
import {PhotoviewerPageModule} from './client/photoviewer/photoviewer.module'
import { IonicStorageModule } from '@ionic/storage';
import { Facebook} from '@ionic-native/facebook/ngx';
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
    AddPhotoPageModule,
    EditSchedPageModule,
    HttpClientModule,
    ViewmealPageModule,
    ReviewsPageModule,
    CategoryPageModule,
    MakereviewPageModule,
    AlbumsPageModule,
    MinfoPageModule,
    MenuPageModule,
    Ionic2RatingModule,
    RestoGalleryPageModule,
    PhotoviewerPageModule,
    IonicStorageModule.forRoot()
    
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
    HttpClient,
    HttpClientModule,
    AndroidPermissions,
    NativePageTransitions,
    Base64,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
  