import { Component, OnInit } from '@angular/core';
import {PostService} from '../post/post.service'
import { ModalController,ToastController,NavController } from '@ionic/angular'
import { ModalmapPage } from '../modalmap/modalmap.page'
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

  import { from } from 'rxjs';
@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.page.html', 
  styleUrls: ['./place-add.page.scss'],

})
export class PlaceAddPage implements OnInit {

  restaurant: any;
  address: any;
  contact: any;
  former: FormGroup
  error_message = {
    restaurant: [
      {type: 'required', message: 'This Field is Required'},
      {type: 'minLength', message: 'character 5'},
      {type: 'maxLength', message: 'character 10'},
      
    ],
    password: [
      {type: 'required', message: 'This Field is Required'},
      {type: 'minLength', message: 'character length must be is less than 5'},
      {type: 'maxLength', message: 'character length must be is greater than 10'},
      {type: 'pattern', message: 'invalid email'},
    ]
  }
  constructor(public post: PostService,public modal: ModalController,public navCtrl: NavController, public nativeCoder: NativeGeocoder,private toastController: ToastController,private router: Router,public loadingController: LoadingController,private validators: Validators,private formBuilder: FormBuilder) {

    this.former = this.formBuilder.group({
      restaurant: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(50),
        
      ])),
      contact: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        
      ]))
    });

   }
  lat: any;
  long: any;
  latlng: any
  administrative: any
  private loading: any;

  private async presentLoading(message): Promise<any> {
    this.loading = await this.loadingController.create({
      message: message
    });
    return await this.loading.present();
  }
  ngOnInit() {
    
        
  }
  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000
    });
    toast.present();
  }
  
  placeadd(){
    let body = {
      restaurant: this.restaurant,
      address: this.address,
      contact: this.contact,
      lat: this.lat,
      lng: this.long,
      string_address: this.administrative
    } 
     
     try{
      // this.router.navigate(["moderateresto",124,"Three grills and a ril","General Santos City"]);
      this.post.postData(body,'add_resto.php').subscribe((Response)=>{
     
        this.presentLoading("uploading... please wait").then(() =>{
          if(Response[0].message == "success"){
            this.loading.dismiss().then(() =>{
              this.router.navigate(["moderateresto",Response[0].id,Response[0].title,Response[0].string_address]);
              
            });
              }else{
            this.loading.dismiss().then(() =>{
              this.presentToast('Error Occured! Try again later');
            });
            
          }  
        })
        
              
      })
     }catch(e){
      this.presentToast('Server Error! Try again later');
     }
    
  }
  goback(){
    this.router.navigate(['home']);
  }
  async presentModal() {
    const modal = await this.modal.create({
      component: ModalmapPage,
       componentProps: { 
         latt: this.lat,
         longg: this.long
       }
    });
    modal.onDidDismiss() 
      .then((data) => {

        const pos = data['data']; 
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
      };
        this.lat = pos.lat
        this.long = pos.lng
      this.nativeCoder.reverseGeocode(pos.lat, pos.lng, options)
      .then((result) => this.administrative = result[0].locality+", "+result[0].subLocality)
      .catch((error: any) => {
        this.administrative = "General Santos City"
        alert(error)
      });
    });
    await modal.present();
  }


}
