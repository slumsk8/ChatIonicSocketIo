import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { ChatIonicPage } from '../chat-ionic/chat-ionic.page'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  dataReturned: any
  private user: string

  constructor(public navCtrl: NavController, public modalCrtl: ModalController) {} 
  
  async openChat(){
    const modal = await this.modalCrtl.create({
      component: ChatIonicPage,
      componentProps: {
        "user": this.user
      }
    })

    modal.onDidDismiss().then((dataReturned) => {
      if(dataReturned !== null) {
        this.dataReturned = dataReturned.data
      }
    })
    return await modal.present()
  }
   
}
