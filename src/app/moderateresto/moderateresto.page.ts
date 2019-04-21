import { Component, OnInit, OnDestroy } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { TitleEditPage } from '../moderate/title-edit/title-edit.page'
import { AddFoodPage } from '../moderate/add-food/add-food.page'
import { EditSchedPage } from '../moderate/edit-sched/edit-sched.page'
import {AddPhotoPage} from '../moderate/add-photo/add-photo.page'
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
  meals:any
   beverage:any
  dishes:any
  beverages:any
  impress = []
  constructor(private androidFullScreen: AndroidFullScreen,private modal: ModalController,private activateRoute: ActivatedRoute,private statusBar: StatusBar,private router: Router,private post:PostService) { }
   
   
   

   
  ngOnInit() {
    this.title = this.activateRoute.snapshot.paramMap.get("title")
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.address = this.activateRoute.snapshot.paramMap.get("address")
    let data = {
      id: this.id
    }
    this.post.postData(data,"get_impress.php").subscribe((res) =>{
      for(var i =0;i < res.length;i++){
        this.impress[i] = "http://192.168.1.16:8888/r_server/"+res[i].img
      }
      if(this.impress.length == 0){
        this.impress.push("https://image.dhgate.com/0x0/f2/albu/g7/M00/09/B9/rBVaSlpqpheAGqouAAJzzx7VRgs819.jpg")
      }
    })


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
 
    this.meals = this.getMeals('meal')
  
    this.beverage = this.getMeals('beverage')
    
  
  
}
  addBeverages(){
    let data = {
      id: this.id,
      role: "beverage"
    }
    this.presentModal(AddFoodPage,data)
  }
  addPhoto(){
    let data = {
      id: this.id
    }
    this.presentModal(AddPhotoPage,data)
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
