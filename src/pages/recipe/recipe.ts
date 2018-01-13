import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {Recipe} from "../../models/recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingService} from "../../services/shopping";
import {RecipesService} from "../../services/recipes";
import {ShoppingListPage} from "../shopping-list/shopping-list";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe;
  index: number;
  shoppingPage = ShoppingListPage;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private slService: ShoppingService,
              private recipeService: RecipesService) {
  }


  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Szerkesztés', recipe: this.recipe, index: this.index});
  }

  onAddIngredients() {
    this.slService.addItemsToList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();

  }

}
