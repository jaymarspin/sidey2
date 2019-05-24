import { Component, OnInit  } from '@angular/core';
import {ModalController,NavParams} from '@ionic/angular'
 
import { FormGroup } from '@angular/forms';
import {CategoryPage} from '../category/category.page'
import {GlobalService} from '../../global/global.service'
@Component({
  selector: 'app-title-edit',
  templateUrl: './title-edit.page.html',
  styleUrls: ['./title-edit.page.scss'],
})
export class TitleEditPage implements OnInit {
  title:any
  cuisines:any
  former: FormGroup
  cat:any
  length:any
  pass:any = false
  constructor(private modalCtrl: ModalController,public navParams:NavParams) {
    
    this.cat = new Array()
    this.cuisines = this.navParams.get('cuisines');
    this.title = this.navParams.get('title');
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
  dismiss(){
    this.modalCtrl.dismiss()
  }
  goback(){
    this.modalCtrl.dismiss()
  }
  edit(){
    
  }
  ngOnInit() {
    
  }

}
