import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:string = "Home";
  tab2Root:string = "About";
  tab3Root:string = "Contact";

  constructor() {

  }
}
