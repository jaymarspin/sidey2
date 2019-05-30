import { Component, OnInit,Input } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
 
import {GlobalService} from '../../global/global.service'
 
import { Base64 } from '@ionic-native/base64/ngx';
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
  pp:any
  imgcol:any
  @Input('id') id
   impress:any
   toRemove:any
  constructor(private base: Base64,public navParams:NavParams,private global: GlobalService,private post: PostService,private modalCtrl: ModalController,private imagePicker: ImagePicker,private webview:WebView) {
    
    this.base64 = new Array()
    this.impress = this.navParams.get('impress');
    this.imgcol = Object.assign([], this.impress);
    this.toRemove = new Array()
 
   }
   ionViewDidEnter(){
      
  }
  ngOnInit() {
  }
  remove(i:any,id:any){
    this.toRemove.push(id)
    this.imgcol.splice(i, 1)
     
  }
  dismiss(){
    this.modalCtrl.dismiss()
  }
  save(){
    if(this.base64.length > 0 || this.toRemove.length > 0){
      let body = {
        file: this.base64,
        toRemove: this.toRemove,
       
        id: this.id,
      
      }
      
      this.global.presentLoading("Submitting").then(() => {
        this.post.postData(body,"add_photo.php").subscribe((res) => {
          let Response = res.json();
     
          if(Response[0].message == "success"){
            this.global.presentToast("Success!")
            if(this.base64.length > 0 ){
              let data = {
                imgpush: Response[0].name,
                role: "add-photo"
              }
              this.global.modalvar.dismiss(data)
              this.global.loading.dismiss()
            }else{
              
              let data = {
                
                role: "add-photo"
              }
              this.global.modalvar.dismiss(data)
              
            }
            
          }
          
        },(err) =>{
          this.global.presentToast("Error Occured")
          this.global.loading.dismiss()
        },()=>{
          this.global.loading.dismiss()
        })
      })
    }else{
      this.global.presentToast("No Changes Have Been Made")
    }
    
    
    
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
   
 

  addFood(){
    
     
   
    
  }
  goback(){
    this.modalCtrl.dismiss()
  }
}
