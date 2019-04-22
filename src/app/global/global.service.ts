import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public modal: ModalController) { }


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
}
