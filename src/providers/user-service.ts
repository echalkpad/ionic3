import { Injectable } from '@angular/core';
import { User } from "../models/user.model";

@Injectable()
export class UserService {
  public users : User[] = [];

  constructor() {
    console.log('Hello UserService Provider');
    this.loadUser();
  }

  loadUser(){
    this.users = [
        {
          id      : 1, 
          name    : "Carlos",
          fullname: "Carlos Augusto Fávero",
          avatar  : "http://lorempixel.com/200/200/sport/",
          arquived: false
        },
        {
          id      : 2,
          name    : "João",
          fullname: "João da Silva",
          avatar  : "http://lorempixel.com/200/200/people/",
          arquived: false
        },
        {
          id      : 3,
          name    : "Pedro",
          fullname: "Pedro Pedreira",
          avatar  : "http://lorempixel.com/200/200/animals/",
          arquived: false
        }
      ];
  }

  getUsers(){
    return new Promise<User[]>(resolve=>{
      resolve(this.users);
    });
  }

  addUser(user : any) {
    return new Promise<User[]>(resolve =>{
      let last : any = this.users.slice(-1)[0];
      let newId = last.id+1;
      this.users.push({
        id      : newId, 
        name    : user.name, 
        fullname: user.fullname, 
        avatar  : "http://lorempixel.com/200/200/people/",
        arquived : false
      });
      resolve(this.users);
    });
    
  }

  removeUser(user : any){
    return new Promise<User[]>(resolve =>{
      let pos = this.users.indexOf(user);
      this.users.splice(pos,1);
      resolve(this.users);
    });
  }

  editUser(user : any, data : any){
    return new Promise<User[]>(resolve =>{
      let pos = this.users.indexOf(user);
      this.users[pos].name = data.name;
      this.users[pos].fullname = data.fullname;
      resolve(this.users);
    });
  }

  arquivarUser(user : any){
    return new Promise<User[]>(resolve =>{
      let pos = this.users.indexOf(user);
      this.users[pos].arquived = !this.users[pos].arquived;
      resolve(this.users);
    });
  }

}
