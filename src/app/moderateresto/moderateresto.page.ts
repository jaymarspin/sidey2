import { Component, OnInit,ViewChild } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';



import { PopoverController } from '@ionic/angular';
import {PostService} from '../post/post.service'
import {GlobalService } from '../global/global.service'
import {ViewmealPage} from '../client/viewmeal/viewmeal.page'
import { Router, ActivatedRoute } from '@angular/router';
import { ModalmapPage } from '../modalmap/modalmap.page'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonContent} from "@ionic/angular"
import * as $ from "jquery";
import {EditorComponent} from "../moderate/editor/editor.component"
@Component({
  selector: 'app-moderateresto',
  templateUrl: './moderateresto.page.html',
  styleUrls: ['./moderateresto.page.scss'],
})
export class ModeraterestoPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  slideOpts = {
    effect: 'flip'
  };
   
  public title:any
  public id:any
  public address:any
  public role:any
  food:any
  manage:any
  impress:any
  scrollnd:any = false;
  category:any 
  cuisines:any
  distance:any
  rate:any
  
  constructor(public popoverController: PopoverController,private global: GlobalService,private androidFullScreen: AndroidFullScreen,private activateRoute: ActivatedRoute,private statusBar: StatusBar,private router: Router,private post:PostService) {
    this.category = ["meal","drinks","halo halo","beverage","ramen","noodles","dessert","others"]
    this.rate = 2.5
    
   }
  
   async presentPopover(ev: any) {
     let data = {
       id: this.id,
       title: this.title
     }
    const popover = await this.popoverController.create({
      component: EditorComponent,
      componentProps: data,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
   

    
   logScrolling(e){
      
    var x = parseInt(e.detail.scrollTop)
    if(parseInt(e.detail.scrollTop) >= 80){
      
      $(".showScroll").fadeIn(150)
    }
    
    
    if(x <= 0){
      $(".showScroll").fadeOut(150)
       
    }
    
   }
  

   ngAfterViewInit(){
    var content = document.querySelector('ion-content');
content.scrollEvents = true;
content.addEventListener('ionScrollStart', () => console.log('scroll start'));
content.addEventListener('ionScroll', (ev) => console.log('scroll', ev));
content.addEventListener('ionScrollEnd', () => console.log('scroll end'));
   }
   
  ngOnInit() {
    
    // this.androidFullScreen.isImmersiveModeSupported()
    // .then(() => {
    //   this.androidFullScreen.showUnderStatusBar()
    // })
    // .catch(err => console.log(err)); 
    
 
  }
  
  // ngOnDestroy(){
  //   this.androidFullScreen.isImmersiveModeSupported()
  // .then(() => this.androidFullScreen.showUnderSystemUI())
  // .catch(err => console.log(err));


  viewmeal(id,name,price,img,i){
    let data = {
      id: id,
      name: name,
      price: price,
      img: img,

    }
    this.global.presentModal(ViewmealPage,data,"")
   
  }

 

  
  
 
  ionViewDidEnter(){
    
    
    this.title = this.activateRoute.snapshot.paramMap.get("title")
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.address = this.activateRoute.snapshot.paramMap.get("address")
    this.role = this.activateRoute.snapshot.paramMap.get("role")
    this.distance = this.activateRoute.snapshot.paramMap.get("distance")
    if(this.role == "admin"){
      this.manage = 1
    }
    
    let data = {
      id: this.id
    }
    
    
    this.post.postData(data,"get_impress.php").subscribe((res) =>{
        this.impress = new Array()
        let data = res.json()
        for(var i =0;i < data.length;i++){
          this.impress[i] = this.post.server+data[i].img
        }
        if(this.impress.length == 0){
          this.impress.push("https://image.dhgate.com/0x0/f2/albu/g7/M00/09/B9/rBVaSlpqpheAGqouAAJzzx7VRgs819.jpg")
        }
      })
    
    
 
    this.getMeals()
    this.getCuisines()
   
  
  
}
onModelChange(e){
  console.log(e)
}
getMeals():any{
  var result = []
  let body = {
    
    id: this.id
  } 
 
 
  this.post.postData(body,"get_food.php").subscribe((res)=>{
  
      let data = res.json();
   
      this.food = data
     })
 
  
  
  return result
}

getCuisines():any{
  var result = []
  let body = {
    
    id: this.id
  } 

  this.post.postData(body,"get_cuisines.php").subscribe((res)=>{
    
   let data = res.json();
  
   this.cuisines = data[0].cuisine
 
  })
  
  return result
}

ionViewWillLeave() {
  // this.androidFullScreen.isImmersiveModeSupported()
  // .then(() => this.androidFullScreen.showSystemUI())
  // .catch(err => console.log(err)); 
  this.global.leave()
 }
 
 
 
  // async presentModal(component:any,data:any) {
  //   const modal = await this.modal.create({
  //     component: component,
  //     cssClass: 'my-custom-modal-css',
  //      componentProps: data
  //   });
  //   modal.onDidDismiss() 
  //     .then((data) => {
 
  //       const pos = data['data']; 
       
  //   });
  //   await modal.present();
  // }



  goback(){
    this.router.navigate(['home']);
  }


}
