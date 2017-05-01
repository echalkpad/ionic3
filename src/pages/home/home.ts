import { Component } from '@angular/core';

import { IonicPage, NavController, ItemSliding, ToastController, AlertController } from 'ionic-angular';
import { reorderArray } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { User } from "../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  public users : User[] = [];
  public usersTemp : User[] = [];
  public arquivados : User[] = [];
  searchQuery: string = '';
  public ordernar : boolean = false;
  public buscar : boolean = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController, 
    private userService : UserService) 
    {
      this.loadUsers();
  }

  onSearch() {
    this.buscar = !this.buscar;
  }

  loadUsers() {
    this.userService.getUsers().then(data => {
      if (data) {
          this.users = data.filter((item) => {
            return (item.arquived == false);
          });
          this.usersTemp = this.users;
          this.arquivados = data.filter((item) => {
            return (item.arquived == true);
          });
        }
      });
  }

  newUser(){
    let alert = this.alertCtrl.create({
      title: 'Novo Usuário',
      inputs: [
        {
          name: 'name',
          placeholder: 'Apelido'
        },
        {
          name: 'fullname',
          placeholder: 'Nome Completo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: (data) => {
            //alert.dismiss().then(()=>{
              if(data){
                this.addUser(data.name, data.fullname);
              }
            //});
          }
        }
      ]
    });
    alert.present();
  }

  addUser(name : string, fullname : string){
    let user = {
      name : name,
      fullname : fullname
    };
    this.userService.addUser(user).then(data =>{
      if (data) {
        this.loadUsers();
        this.presentToast('Usuário adicionado com sucesso!');        
      }
    }); 
  }

  editUser(item:ItemSliding, user : any){
    item.close();

    let alert = this.alertCtrl.create({
      title: 'Editar Usuário',
      inputs: [
        {
          name: 'name',
          value: user.name,
          placeholder: 'Apelido'
        },
        {
          name: 'fullname',
          value : user.fullname,
          placeholder: 'Nome Completo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: (data) => {
            //alert.dismiss().then(()=>{
              if(data){
                this.userService.editUser(user, data).then(data=>{
                  this.loadUsers();
                  this.presentToast('Usuário editado com sucesso!');        
                });
              }
            //});
          }
        }
      ]
    });
    alert.present();
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

  getItems(ev: any) {
    // Reset items back to all of the items
    this.users = this.usersTemp;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  onCancel(event : any){
    this.users = this.usersTemp;
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
            //alert.dismiss().then(()=>{
              this.userService.removeUser(user).then(data=>{
                if (data) {
                  this.loadUsers();
                  this.presentToast('Usuário excluído com sucesso!');        
                }
              });
            //});
          }
        }
      ]
    });
    alert.present();
  }

  arquivarUser(item:ItemSliding, user : any) {
    item.close();

    let alert = this.alertCtrl.create({
      title: user.arquived == false ? 'Arquivar usuário?' : 'Restaurar usuário?',
      subTitle: `Deseja realmente ${user.arquived == false ? 'arquivar':'restaurar'} o usuário ${user.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: user.arquived == false ? 'Arquivar' : 'Restaurar',
          handler: () => {
            //alert.dismiss().then(()=>{
              this.userService.arquivarUser(user).then(data=>{
                if (data) {
                  this.loadUsers();
                  this.presentToast(user.arquived == true ? 'Usuário arquivado com sucesso!' : 'Usuário restaurado com sucesso!');        
                }
              });
            //});
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
