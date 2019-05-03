import { Component, OnInit } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { TitleEditPage } from '../moderate/title-edit/title-edit.page'
import { AddFoodPage } from '../moderate/add-food/add-food.page'
import { EditSchedPage } from '../moderate/edit-sched/edit-sched.page'
import {AddPhotoPage} from '../moderate/add-photo/add-photo.page'

import {PostService} from '../post/post.service'
import {GlobalService } from '../global/global.service'
import {ViewmealPage} from '../client/viewmeal/viewmeal.page'
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
   
  public title:any
  public id:any
  public address:any
  public role:any
  meals:any
   beverage:any
  dishes:any
  beverages:any
  edit:any = "edit"
  impress = []
  constructor(private global: GlobalService,private androidFullScreen: AndroidFullScreen,private activateRoute: ActivatedRoute,private statusBar: StatusBar,private router: Router,private post:PostService) { }
   
      
   

   
  ngOnInit() {
    


    // this.androidFullScreen.isImmersiveModeSupported() 
    
    
    
  // .then(() => this.androidFullScreen.immersiveMode().then(()=>{
  //   this.statusBar.backgroundColorByHexString('#888');
  // }))
  // .catch(err => alert(err)); 
  }
  
  // ngOnDestroy(){
  //   this.androidFullScreen.isImmersiveModeSupported()
  // .then(() => this.androidFullScreen.showUnderSystemUI())
  // .catch(err => console.log(err));
  // }
  try(){
    this.router.navigate(["add-food"]);
  }

  viewmeal(id,name,price,img){
    let data = {
      id: id,
      name: name,
      price: price,
      img: img
    }
    this.global.presentModal(ViewmealPage,data,"")
   
  
  }

  editTile(){
    let data = {
      title: this.title
    }
    this.global.presentModal(TitleEditPage,data,"")
    
  }
  
  
  editAddress(){
    let data = {
      lat: 6.123961,
         long: 125.168949,
         role: "admin"
    }
    this.global.presentModal(ModalmapPage,data,"")
  }
  editSched(){
    let data = {
      
    }
    this.global.presentModal(EditSchedPage,data,"")
    
  }

  getMeals(foodrole:string):any{
    var result = []
    let body = {
      role: foodrole,
      id: this.id
    } 
  
    this.post.postData(body,"get_food.php").subscribe((res)=>{
     
     let data = res.json();
      
      if(body.role == "beverage"){
        document.getElementById('beverage').style.width = (data.length * 1.2) * 153.75+"px";
        this.beverages = data.length
      } 
        
      else{
        document.getElementById('meal').style.width = (data.length * 1.2) * 153.75+"px";
        this.dishes = data.length
      } 
        
      for(var i = 0;i < data.length; i++){
        result[i] = data[i];
      }
    })
    
    return result
  }

  ionViewDidEnter(){


    this.title = this.activateRoute.snapshot.paramMap.get("title")
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.address = this.activateRoute.snapshot.paramMap.get("address")
    this.role = this.activateRoute.snapshot.paramMap.get("role")

    if(this.role == "client"){
      this.edit = "tago"
    }
    let data = {
      id: this.id
    }
    this.post.postData(data,"get_impress.php").subscribe((res) =>{
      let data = res.json()
      for(var i =0;i < data.length;i++){
        this.impress[i] = this.post.server+data[i].img
      }
      if(this.impress.length == 0){
        this.impress.push("https://image.dhgate.com/0x0/f2/albu/g7/M00/09/B9/rBVaSlpqpheAGqouAAJzzx7VRgs819.jpg")
      }
    })
 
    this.meals = this.getMeals('meal')
  
    this.beverage = this.getMeals('beverage')
    
  
  
}
addFood(){
  let data = {
    role: "meal",
    id: this.id
  }
  this.global.presentModal(AddFoodPage,data,"")
  
}
addDesserts(){
  let data = {
    role: "dessert",
    id: this.id
  }
  this.global.presentModal(AddFoodPage,data,"")
}

  addBeverages(){
    let data = {
      id: this.id,
      role: "beverage"
    }
    this.global.presentModal(AddFoodPage,data,"")
    
  }
  addPhoto(){
    let data = {
      id: this.id
    }
    this.global.presentModal(AddPhotoPage,data,"")
    
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
