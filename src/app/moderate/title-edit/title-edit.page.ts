import { Component, OnInit, Input  } from '@angular/core';
import {ModalController,NavParams} from '@ionic/angular'
 
import { FormGroup } from '@angular/forms';
import {CategoryPage} from '../category/category.page'
import {GlobalService} from '../../global/global.service'
import {PostService} from '../../post/post.service'
@Component({
  selector: 'app-title-edit',
  templateUrl: './title-edit.page.html',
  styleUrls: ['./title-edit.page.scss'],
})
export class TitleEditPage implements OnInit {
  id:any
  title:any
  cuisines:any
  former: FormGroup
  minfo:any
  cat:any
  length:any
  pass:any = false
  constructor(private global:GlobalService,private post:PostService, private modalCtrl: ModalController,public navParams:NavParams) {
    
    this.cat = new Array()
    this.cuisines = this.navParams.get('cuisines');
    this.title = this.navParams.get('title');
    this.id = this.navParams.get('id');
    this.minfo = this.navParams.get('minfo');
    this.cat = this.cuisines
    this.length = this.cat.length
    
   
  }
  async category() {
    
    let data = {
      selected: this.cat,
        role: "admin"
    }
    if(this.pass == true && this.cat.length > 0){
      data = {
        selected: this.cat,
        role: "admin"
      }
    }
    const modal = await this.modalCtrl.create({
      component: CategoryPage,
       componentProps: data
    });
    modal.onDidDismiss() 
      .then((data) => {
        const x = data['data'];
        if(x != null)this.cat = x.selected
          
    }).then(() =>{
      this.pass = true
      if(this.cat.length > 0){
        this.length = this.cat.length
      }else{
        this.length = null
      }
    }); 
    await modal.present();
  }
  
  goback(){
    
    this.modalCtrl.dismiss()
  }
  edit(){
    let data = {
      id: this.id,
      cuisines: this.cat,
      title: this.title,
      minfo: this.minfo
    }
    this.global.presentLoading("Submitting").then(()=>{
      this.post.postData(data,"general_edit.php").subscribe((Response) => {
         let res = Response.json()
         this.global.presentToast(res[0].message)
      },(e)=>{
        this.global.loading.dismiss()
      },()=>{
        let data = {
          cuisines: this.cat,
          title: this.title,
          minfo: this.minfo,
          role: "general-setting"
        }
        this.modalCtrl.dismiss(data)
        
        this.global.loading.dismiss()
      })
    })
    
  }
  ngOnInit() {
    
  }
  ionViewWillLeave(){
    this.global.leave()
   }
}
