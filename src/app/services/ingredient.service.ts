import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FicheTechnique} from "../models/fiche-technique";
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../models/ingredient";
import {Vente} from "../models/vente";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ventes : Vente[] = [{name : 'nouilles',nbPlat:'3'}];
  ingToDecrease : Ingredient[];
  quantToDecrease : number[];
  private ing = [];
  ingredientSubject = new Subject<any[]>()
  ingSubject = new Subject<any[]>();
  ingDecreaseSubject = new Subject<any[]>();
  private ingredients : Ingredient []= [
    {
      id:'4',
      name: 'farine',
      unit:'g',
      stocks:3,
      unitprice:2,
      allergene:'oui'

    },
    {
      id:'2',
      name: 'beurre',
      unit:'g',
      stocks:3,
      unitprice:2,
      allergene:'oui'
    }

  ];
 ingredient = {
    id:'5',
    name: 'riz cantonais',
   unit:'goug',
   stocks:3,
   unitprice:2,
   allergene:'oui'
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
    const stocks = form.value['stocks'];
    const unitprice = form.value['unitprice'];
    const allergene = form.value['allergene'];

  }

  newEmitIngSubjetc(){
    this.ingDecreaseSubject.next(this.ingToDecrease.slice());

  }
  emitingSubject() {
    this.ingSubject.next(this.ingredients.slice());
  }
  getIngredientByName(name : string){
    const ingredient = this.ingredients.find(
      (ingObject) => {
        return ingObject.name === name;
      }
    );
    return ingredient;
  }
  returnPostionIndexToDecrease(ingredient : Ingredient){
    for (let index in this.ingToDecrease){
      if (this.ingToDecrease[index] == ingredient){
        return index;

      }

    }
    return 0;

  }
  addIngToDecrease(ingredients : Ingredient[], quantities : number[]){
    this.ingToDecrease = ingredients;
    this.quantToDecrease = quantities;

    for(var ing of this.ingToDecrease) {
      for(var ings of this.ingredients){
        if(ings == ing){
          var s = this.returnPostionIndexToDecrease(ing);
          ings.stocks = ings.stocks - this.quantToDecrease[s];
        }
      }
      this.getIngredientByName(ing.name);

      //this.ingredients[index].stocks = this.ingredients[index].stocks - this.
    }

  }


  /*addRecette(recette: FicheTechnique) {
    this.ficheTechnicas.push(recette);
    this.emitUsers();
  }*/

  addIng(id : string, name: string, unit: string, stocks: number, unitprice: number, allergene: string) {
    const ingredientObject = {
      id: '0',
      name: '',
      unit: '',
      stocks: 0,
      unitprice:0,
      allergene: ''
    };
    ingredientObject.id = id;
    ingredientObject.name = name;
    ingredientObject.unit = unit;
    ingredientObject.stocks = stocks;
    ingredientObject.unitprice = unitprice;
    ingredientObject.allergene = allergene;




    this.ingredients.push(ingredientObject);
    this.emitingSubject();
  }
  getIngredientNoBackByName(name : string){
    const ingredient = this.ingredients.find(
      (ingObject) => {
        return ingObject.name === name;
      }
    );
    console.log(this.ingredients);
    return ingredient;
  }
  addVente(vente: Vente) {
    this.ventes.push(vente);
    this.emitingSubject();
    console.log(this.ventes);
  }

}
