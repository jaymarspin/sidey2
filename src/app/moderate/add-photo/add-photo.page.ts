import { Component, OnInit,Input } from '@angular/core';
import {ModalController,ToastController} from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import {GlobalService} from '../../global/global.service'
 
import { HttpClient } from '@angular/common/http'
import {PostService} from '../../post/post.service'
@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {
  imgsrc:string
  base64:any
  loading:any
  base:any
  @Input('id') id
  constructor(private global: GlobalService,private post: PostService,private modalCtrl: ModalController,private imagePicker: ImagePicker,private webview:WebView,private file:File,private camera:Camera,private http:HttpClient,private toastController:ToastController) {

 
   }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss()
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
   
  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000
    });
    toast.present();
  }
 

  addFood(){
   
     
    let body = {
      file: this.base64,

     
      id: this.id,
    
    }
    
    this.global.presentLoading("Submitting").then(() => {
      this.post.postData(body,"add_photo.php").subscribe((res) => {
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
  goback(){
    this.modalCtrl.dismiss()
  }
}
