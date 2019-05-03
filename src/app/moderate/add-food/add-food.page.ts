import { Component, OnInit, Input } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import {ModalController,ToastController,LoadingController} from '@ionic/angular'

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import {GlobalService} from '../../global/global.service'
import {PostService} from '../../post/post.service'
import { Base64 } from '@ionic-native/base64/ngx';
import { from } from 'rxjs';
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
  public base64:any
  @Input('id') id
  @Input('role') role
  constructor(private global: GlobalService,private base:Base64,private post:PostService,private loadingController:LoadingController,private imagePicker: ImagePicker,private file: File,private camera: Camera,private webview: WebView,private validators: Validators,private formBuilder: FormBuilder,private modalCtrl: ModalController, private toastController:ToastController) { 
    
    this.base64 = new Array()
    
    this.former = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(50),
        
      ]))
     
    });

  }

  ngOnInit() {
    this.imgsrc = "assets/icon/eating.png"
  
  
    
  }
  
  onViewDidEnter(){
   
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }
  


  
  addFood(){
   

    let body = {
      file: this.base64,
      name: this.name,
      price: this.price,
      id: this.id,
      role: this.role
    }
    this.post.postData(body,"addFood.php").subscribe((res) => {
      let Response = res.json();
      alert(Response[0].message)
    },(err) =>{
      alert(err)
    },()=>{

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
        
      },(err)=>{
        console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
      })
      
 
    }

  takeAPic(){
    const options: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
      }
      this.camera.getPicture(options).then((imageData) => {
        
        let filename = imageData.substring(imageData.lastIndexOf('/')+1);
        let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
        
             this.file.readAsDataURL(path, filename).then(res=> {
              this.imgsrc = res
              this.base64 = res
           
             });
    }).catch((err)=>{alert(err)})
    
    
  }

}
