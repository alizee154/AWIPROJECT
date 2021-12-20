import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FicheTechnique} from "../models/fiche-technique";
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  ingSubject = new Subject<any[]>();
  private ingredients : Ingredient []= [
    {
      id:'4',
      name: 'farine',
      unit:'g',
      quantity:3,
      unitprice:2,
      allergene:true

    },
    {
      id:'2',
      name: 'beurre',
      unit:'g',
      quantity:3,
      unitprice:2,
      allergene:true
    }

  ];
 ingredient = {
    id:'5',
    name: 'riz cantonais',
   unit:'goug',
   quantity:3,
   unitprice:2,
   allergene:true
  };




  constructor(){
    this.listMessage = [];

  }
  public listMessage: string[];



  /*emitUsers() {
    this.recetteSubject.next(this.ficheTechnicas.slice());
  }*/
  onSubmit(form: NgForm) {
    const id = form.value['id'];
    const name = form.value['name'];
    const unit = form.value['unit'];
    const quantity = form.value['quantity'];
    const unitprice = form.value['unitprice'];
    const allergene = form.value['allergene'];

  }
  emitingSubject() {
    this.ingSubject.next(this.ingredients.slice());
  }

  /*addRecette(recette: FicheTechnique) {
    this.ficheTechnicas.push(recette);
    this.emitUsers();
  }*/

  addIng(id : string, name: string, unit: string, quantity: number, unitprice: number, allergene: boolean) {
    const ingredientObject = {
      id: '0',
      name: '',
      unit: '',
      quantity: 0,
      unitprice:0,
      allergene: true
    };
    ingredientObject.id = id;
    ingredientObject.name = name;
    ingredientObject.unit = unit;
    ingredientObject.quantity = quantity;
    ingredientObject.unitprice = unitprice;
    ingredientObject.allergene = allergene;




    this.ingredients.push(ingredientObject);
    this.emitingSubject();
  }
}
