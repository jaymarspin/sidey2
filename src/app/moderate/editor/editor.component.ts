import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular'
import { TitleEditPage } from '../title-edit/title-edit.page'
import { AddFoodPage } from '../add-food/add-food.page'
import { EditSchedPage } from '../edit-sched/edit-sched.page'
import {AddPhotoPage} from '../add-photo/add-photo.page'
import {AlbumsPage} from '../albums/albums.page'
import {MenuPage} from '../menu/menu.page'

import {GlobalService } from '../../global/global.service'
import { ModalmapPage } from '../../modalmap/modalmap.page'

 
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  
  id:any
 title:any
 cuisines:any
 lat:any
 long:any
 minfo:any

  constructor(private popover: PopoverController,private global: GlobalService,public navParams:NavParams) { 
    this.id = this.navParams.get('id');
    this.title = this.navParams.get('title');
    this.cuisines = this.navParams.get('cuisines');
    this.lat = this.navParams.get('lat');
    this.long = this.navParams.get('long');
    this.minfo = this.navParams.get('minfo');
    
    
  }

  ngOnInit() {}
  addPhoto(){
    let data = {
      id: this.id
    }
    this.global.presentModal(AddPhotoPage,data,"")
    
  }
  editTile(){
    let data = {
      id: this.id,
      title: this.title,
      cuisines: this.cuisines,
      minfo: this.minfo
    }
    this.global.presentModal(TitleEditPage,data,"").then(()=>{
      this.global.modalvar.onDidDismiss().then((data) =>{
        
        this.popover.dismiss(data)
      })
    })
    
  }

  addFood(){
    let data = {
      role: "meal",
      id: this.id,
      title: this.title
    }
    this.global.presentModal(AddFoodPage,data,"")
    
  }
  editSched(){
    let data = {
      id: this.id
    }
    this.global.presentModal(EditSchedPage,data,"")
    
  }
  editAddress(){
    
    let data = {
         lat: this.lat,
         long: this.long,
         role: "admin",
         change: 1
    }
    this.global.presentModal(ModalmapPage,data,"").then(() =>{
      this.global.modalvar.onDidDismiss().then((data) =>{
          if(data){
            alert("Awdad")
          } 
      });
    })
    
  }
  menu(){
    let data = {
      id: this.id
    }
    this.global.presentModal(MenuPage,data,"")
  }
  album(){
    let data = {
      id: this.id
    }
    this.global.presentModal(AlbumsPage,data,"")
  }
  

  

}
