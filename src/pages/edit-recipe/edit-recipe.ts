import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavParams, ToastController} from "ionic-angular";
import {FormControl, FormGroup, Validators, FormArray} from "@angular/forms";


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  private mode = 'Új';
  selectOptions = ['Könnyű', 'Közepes', 'Nehéz'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private aSCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.aSCtrl.create({
      title: 'Mit szeretnél tenni?',
      buttons: [
        {
          text: 'Új hozzávaló',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Össze hozzávaló törlése',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for  (let i = len-1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'Minden hozzávaló törölve!',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Mégsem',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Új Hozzávaló',
      inputs: [
        {
          name: 'name',
          placeholder: 'Megnevezés'
        }
      ],
      buttons: [
        {
          text: 'Mégsem',
          role: 'cancel'
        },
        {
          text: 'Hozzáad',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Kérlek érvényes adatokat adj meg!',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              return;
            }

            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Hozzáadva!',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Közepes', Validators.required),
      'ingredients': new FormArray([])
    });
  }

}
