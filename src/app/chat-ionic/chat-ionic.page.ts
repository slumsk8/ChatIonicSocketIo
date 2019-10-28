import { Component, OnInit, ViewChild, ContentChild, AfterViewInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, IonContent } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-chat-ionic',
  templateUrl: './chat-ionic.page.html',
  styleUrls: ['./chat-ionic.page.scss'],
})
export class ChatIonicPage implements AfterViewInit {
  
  private user: string
  private message: string
  private messages = new Array<any>()  
  private container: HTMLElement
  

  constructor(
    public navCtrl: NavController, 
    public modalCrtl: ModalController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    private socketCtrl: Socket     
  ) {    
    // eventos do usuário logado
    this.user = this.navParams.get('user')  
    this.socketCtrl.connect()
    this.socketCtrl.emit("user-connected", this.user)    
    
    this.getUsers().subscribe((data: any) => {
      this.presentToast("User " + data.event + ": " + data.user)
    })

    this.getMessages().subscribe(message => {
      this.messages.push(message)
    })
  }

  // observando por novos dados de usuarios, quando o socket emite ele escuta e retorna os dados
  getUsers(){
    let observable = new Observable(observer => {
      this.socketCtrl.on("users-changed", data => {
        observer.next(data)
      })
    })
    return observable
  }
  getMessages(){
    let observable = new Observable(observer => {
      this.socketCtrl.on("message", data => {
        observer.next(data)     
      })
    })
    return observable
  }
  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000      
    })
   toast.present()
  }
    
  sendMessage(){
    if(this.message !== ''){
      this.socketCtrl.emit("message", { user: this.user, message: this.message, date: new Date() })
      this.message = null
    }    
  }

    ionViewWillUnload(){
    this.socketCtrl.removeAllListeners()
    this.socketCtrl.disconnect()
  }

  ngAfterViewInit() {    
    this.container = document.querySelector('ion-content')
    this.container.scrollHeight
  }

  
}
