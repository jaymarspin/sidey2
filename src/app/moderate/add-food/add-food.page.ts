import { Component, OnInit, Input } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import {ModalController} from '@ionic/angular'

import { FormGroup, FormBuilder } from '@angular/forms';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute } from '@angular/router';

import {GlobalService} from '../../global/global.service'
import {PostService} from '../../post/post.service'
import { Base64 } from '@ionic-native/base64/ngx';
import {CategoryPage} from '../category/category.page'
@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {
  name:any
  price:any
  imgsrc:any 
  former: FormGroup
  loading:any
  cat:any
  length:any
  public base64:any
  pass:any = false
  @Input('id') id
  
  constructor(private activateRoute:ActivatedRoute,private global: GlobalService,private base:Base64,private post:PostService,private imagePicker: ImagePicker,private webview: WebView,private formBuilder: FormBuilder,private modalCtrl: ModalController) { 
    
    this.base64 = new Array()
    this.cat = new Array()
  
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    
    
    

  }

  ngOnInit() {
    
  }
  
 
  ionViewWillLeave() {
    this.global.leave()
   }

  dismiss(){
    this.modalCtrl.dismiss()
  }
 
  async category() {
    
    let data = {
      
    }
    if(this.pass == true && this.cat.length > 0){
      data = {
        selected: this.cat
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

  
  addFood(){
   
     
    let body = {
      file: this.base64,
      name: this.name,
      price: this.price,
      id: this.id,
      role: this.cat
    }
    
    this.global.presentLoading("Submitting").then(() => {
      this.post.postData(body,"addFood.php").subscribe((res) => {
        
        let Response = res.json();
        if(Response[0].message == "success"){
          this.global.presentToast("Success!")
        }
        
      },(err) =>{
        alert(err)
      },()=>{
        this.global.loading.dismiss()
      })
    })
    
    
  }

 

  pickImage(){
    const options = {
    // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 1,
    
    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.
  
    
    // quality of resized image, defaults to 100
    quality: 100,

    // output type, defaults to FILE_URIs.
    // available options are 
    // window.imagePicker.OutputType.FILE_URI (0) or 
    // window.imagePicker.OutputType.BASE64_STRING (1)
 
};
    

    this.imagePicker.getPictures(options).then((results) => {
      if(results.length > 0){
        this.global.presentLoading("Please Wait").then(() =>{
          for (var i = 0; i < results.length; i++) {
            this.imgsrc = this.webview.convertFileSrc(results[i]);
    
            
              this.base.encodeFile(results[i]).then((base64File: string) => {
                
                this.base64.push(base64File)
                this.global.loading.dismiss()
                
                
              }, (err) => {
                console.log(err);
              })
            }
          })
      }
      
        
      },(err)=>{
        console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
      })
      
 
    }

  

}
