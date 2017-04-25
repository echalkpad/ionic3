import { Component } from '@angular/core';
import { NavController, ItemSliding, ToastController, AlertController } from 'ionic-angular';
import { reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public users : any;
  public usersTemp : any;
  public name : string;
  public fullname : string;
  searchQuery: string = '';
  public ordernar : boolean = false;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.initializeItems();
  }

  onOrdernar(){
    this.ordernar=!this.ordernar;
  }

  reorderItems(indexes) {
    this.users = reorderArray(this.users, indexes);
    //let element = this.users[indexes.from];
    //this.users.splice(indexes.from, 1);
    //this.users.splice(indexes.to, 0, element);
  }

  initializeItems(){
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
    this.usersTemp = this.users;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.users = this.usersTemp;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel(event : any){
    this.users = this.usersTemp;
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
    this.usersTemp = this.users;
    this.name='';
    this.fullname='';
    this.presentToast('Usuário adicionado com sucesso!');        
  }

  close(item:ItemSliding) {
    item.close();
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
            this.usersTemp = this.users;
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
      position: 'bottom'
    });
    toast.present();
  }
}
