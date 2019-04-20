import { Component, OnInit, OnDestroy } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { TitleEditPage } from '../moderate/title-edit/title-edit.page'
import { AddFoodPage } from '../moderate/add-food/add-food.page'
import { EditSchedPage } from '../moderate/edit-sched/edit-sched.page'
import { ModalController,ToastController, NavController } from '@ionic/angular'
import {PostService} from '../post/post.service'
import { from } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalmapPage } from '../modalmap/modalmap.page'
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-moderateresto',
  templateUrl: './moderateresto.page.html',
  styleUrls: ['./moderateresto.page.scss'],
})
export class ModeraterestoPage implements OnInit {
 
  slideOpts = {
    effect: 'flip'
  };
   items:any  = [
     {src: "https://image.dhgate.com/0x0/f2/albu/g7/M00/09/B9/rBVaSlpqpheAGqouAAJzzx7VRgs819.jpg",title:"sample"},
     {src: "https://www.feathr.com/images/uploads/Sketch-MartinCreed.jpg",title:"sample2"},
     {src: "https://www.wallpaperup.com/uploads/wallpapers/2015/07/24/761368/c2177ff23f862b515dd9f1517b011727-700.jpg",title:"sample2"}
   
  ]
  public title:any
  public id:any
  public address:any
  constructor(private androidFullScreen: AndroidFullScreen,private modal: ModalController,private activateRoute: ActivatedRoute,private statusBar: StatusBar,private router: Router,private post:PostService) { }
   
   
  ngOnInit() {
    
    this.title = this.activateRoute.snapshot.paramMap.get("title")
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.address = this.activateRoute.snapshot.paramMap.get("address")
    this.androidFullScreen.isImmersiveModeSupported() 
    this.getMeals("meal")
    
  // .then(() => this.androidFullScreen.immersiveMode().then(()=>{
  //   this.statusBar.backgroundColorByHexString('#888');
  // }))
  // .catch(err => alert(err)); 
  }
  ngOnDestroy(){
    this.androidFullScreen.isImmersiveModeSupported()
  .then(() => this.androidFullScreen.showUnderSystemUI())
  .catch(err => console.log(err));
  }
  try(){
    this.router.navigate(["add-food"]);
  }

  editTile(){
    let data = {
      title: this.title
    }
    this.presentModal(TitleEditPage,data)
  }
  addFood(){
    let data = {
      role: "meal",
      id: this.id
    }
    this.presentModal(AddFoodPage,data)
  }
  editAddress(){
    
    this.presentModal(ModalmapPage,null).then((data) =>{
      
    })
  }
  editSched(){
    this.presentModal(EditSchedPage,null)
  }

  getMeals(foodrole:string):any{
    var result = []
    let body = {
      role: foodrole,
      id: this.id
    } 
    
    this.post.postData(body,"get_food.php").subscribe((data)=>{
      for(var i = 0;i < data.length; i++){
        result[i] = data[i];
        
      }
    })

    return result
  }
  addBeverages(){
    let data = {
      id: this.id,
      role: "beverage"
    }
    this.presentModal(AddFoodPage,data)
  }
  async presentModal(component:any,data:any) {
    const modal = await this.modal.create({
      component: component,
      cssClass: 'my-custom-modal-css',
       componentProps: data
    });
    modal.onDidDismiss() 
      .then((data) => {

        const pos = data['data']; 
       
    });
    await modal.present();
  }


}
