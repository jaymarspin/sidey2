import { Component, OnInit, OnDestroy } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { TitleEditPage } from '../moderate/title-edit/title-edit.page'
import { ModalController,ToastController } from '@ionic/angular'
import { from } from 'rxjs';
@Component({
  selector: 'app-moderateresto',
  templateUrl: './moderateresto.page.html',
  styleUrls: ['./moderateresto.page.scss'],
})
export class ModeraterestoPage implements OnInit {
  title = "three grills and a grill"
  slideOpts = {
    effect: 'flip'
  };
   items:any  = [
     {src: "https://image.dhgate.com/0x0/f2/albu/g7/M00/09/B9/rBVaSlpqpheAGqouAAJzzx7VRgs819.jpg",title:"sample"},
     {src: "https://www.feathr.com/images/uploads/Sketch-MartinCreed.jpg",title:"sample2"},
     {src: "https://www.wallpaperup.com/uploads/wallpapers/2015/07/24/761368/c2177ff23f862b515dd9f1517b011727-700.jpg",title:"sample2"}
   
  ]
  constructor(private androidFullScreen: AndroidFullScreen,private modal: ModalController) { }
   
   
  ngOnInit() {
    this.androidFullScreen.isImmersiveModeSupported()
  .then(() => this.androidFullScreen.immersiveMode())
  .catch(err => console.log(err)); 
  }
  ngOnDestroy(){
    this.androidFullScreen.isImmersiveModeSupported()
  .then(() => this.androidFullScreen.showUnderSystemUI())
  .catch(err => console.log(err));
  }
  onViewDidEnter(){
    
  }
  async presentModal() {
    const modal = await this.modal.create({
      component: TitleEditPage,
      cssClass: 'my-custom-modal-css',
       componentProps: { 
          title: this.title
       }
    });
    modal.onDidDismiss() 
      .then((data) => {

        const pos = data['data']; 
       
    });
    await modal.present();
  }


}
