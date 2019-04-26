import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public modal: ModalController,private nativePageTransitions: NativePageTransitions) { }


  async presentModal(component:any,data:any,css:any) {
    const modal = await this.modal.create({
      component: component,
      cssClass: css,
       componentProps: data
    });
    modal.onDidDismiss() 
      .then((data) => {
 
        const pos = data['data']; 
       
    });
    await modal.present();
  }

  leave(){
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 350,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     }
  
  
  return this.nativePageTransitions.slide(options)
     
  
  }
  enter(){
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 350,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     }
  
     return this.nativePageTransitions.slide(options)
  }
}
