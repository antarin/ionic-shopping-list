import {Ingredient} from "../models/ingredient";

export class ShoppingService {

  private ingredients: Ingredient[] = [];

  addItemToList(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItemsToList(items: Ingredient[]) {
      this.ingredients.push(...items);
  }

  getList() {
    return this.ingredients.slice();
  }

  removeFromList(index: number) {
    this.ingredients.splice(index, 1);
  }
}
