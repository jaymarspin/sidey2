import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { from } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
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
  constructor(private imagePicker: ImagePicker,private file: File,private camera: Camera,private webview: WebView,private validators: Validators,private formBuilder: FormBuilder) { 
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
  }

  addFood(){
    alert(this.name+"-"+this.price)
    let postData = new FormData()
    
  }
  pickImage(){
    let options = {
      title: "Select picture",
      message: 'Select min 1',
      outType: 0,
      maximumImagesCount: 1,
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
       
        this.imgsrc = this.webview.convertFileSrc(results[i])
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
        
             
             this.file.readAsDataURL(path, filename).then(res=> this.imgsrc = res  );
    }).catch((err)=>{alert(err)})
    
    
  }

}
