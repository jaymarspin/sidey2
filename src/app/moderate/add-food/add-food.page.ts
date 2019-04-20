import { Component, OnInit, Input } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import {ModalController,ToastController} from '@ionic/angular'
import { from } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Observable } from 'rxjs/observable'
import { HttpClient } from '@angular/common/http'

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
  @Input('id') id
  @Input('role') role
  constructor(private imagePicker: ImagePicker,private file: File,private camera: Camera,private webview: WebView,private validators: Validators,private formBuilder: FormBuilder,private modalCtrl: ModalController,private keyboard: Keyboard, private http: HttpClient, private toastController:ToastController) { 
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
  public base64:any


  
  addFood(){
    let url = "http://192.168.1.16:8888/r_server/addFood.php"
    let postdata = new FormData();
    this.base64 = 'data:image/jpeg;base64,' + this.base64;
    postdata.append('file',this.base64);
    postdata.append('name',this.name);
    postdata.append('price',this.price);
    postdata.append('id',this.id);
    postdata.append('role',this.role);
    let data:Observable<any> = this.http.post(url,postdata)
    data.subscribe((res) =>{
       if(res[0].message == "success"){
        this.modalCtrl.dismiss()
        this.presentToast("success");
       }else this.presentToast("Error Occured");
    })

    
  }
  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000
    });
    toast.present();
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
      for (var i = 0; i < results.length; i++) {
        var ext = this.webview.convertFileSrc(results[i]).substring(this.webview.convertFileSrc(results[i]).lastIndexOf(".")+1)
        
        if(ext == "jpeg" || ext == "JPEG"){
           alert("png or jpeg is invalid please choose other image!")
        }else{
          
          var imagePath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
          var imageName = results[i].substr(results[i].lastIndexOf('/') + 1);
          this.file.readAsDataURL(imagePath, imageName).then((b64str) => {
          this.base64 = b64str;
          
        }).catch(err => {
          console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
        })
        this.imgsrc = this.webview.convertFileSrc(results[i]);
        }
        
      }
      
    }, (err) => {
      alert(err);
    });
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
