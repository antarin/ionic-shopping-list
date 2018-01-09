import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingService} from "../../services/shopping";

import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];


  constructor(private shoppingService: ShoppingService) {
  }

  onAddItem(form: NgForm) {
    this.shoppingService.addItemToList(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingService.getList();
  }

  onItemClick(index: number) {
     this.shoppingService.removeFromList(index);
    this.loadItems();
  }



}
