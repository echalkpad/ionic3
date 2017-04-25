import { Component } from '@angular/core';
import { NavController, ItemSliding, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public users : any;
  public name : string;
  public fullname : string;
  public exibir : boolean = false;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.users = [
      {
        id : 1,
        name: "Carlos",
        fullname: "Carlos Augusto Fávero"
      },
      {
        id : 2,
        name: "João",
        fullname : "João da Silva"
      },
      {
        id : 3,
        name: "Pedro",
        fullname : "Pedro Pedreira"
      }
    ];
  }

  onExibir(){
    this.exibir = !this.exibir;
  }

  addUser(){
    let last = this.users.slice(-1)[0];
    let newId = last.id+1;
    this.users.push(
      {
        id: newId,
        name : this.name,
        fullname : this.fullname
      });
    this.name='';
    this.fullname='';
    this.presentToast('Usuário adicionado com sucesso!');        
  }

  deleteItem(item:ItemSliding, user : any) {
    item.close();

    let alert = this.alertCtrl.create({
      title: 'Excluir usuário?',
      subTitle: `Deseja realmente excluir o usuário ${user.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            let pos = this.users.indexOf(user);
            console.log(pos);
            this.users.splice(pos,1);
            alert.dismiss(()=>{
              this.presentToast('Usuário excluído com sucesso!');        
            });
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(message : string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
