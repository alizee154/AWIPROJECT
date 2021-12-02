import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FicheTechnique} from "../models/fiche-technique";
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  ingSubject = new Subject<any[]>();
  private ingredients = [
    {
      id:'4',
      name: 'couscous',
      unit:'goug',
      quantity:'hello',
      unitprice:'hello',
      allergene:'hello'

    },
    {
      id:'2',
      name: 'sushi',
      unit:'goug',
      quantity:'hello',
      unitprice:'hello',
      allergene:'hello'
    }

  ];
 ingredient = {
    id:'5',
    name: 'riz cantonais',
   unit:'goug',
   quantity:'hello',
   unitprice:'hello',
   allergene:'hello'
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

  addIng(id : string, name: string, unit: string, quantity: string, unitprice: string, allergene: string) {
    const ingredientObject = {
      id: '0',
      name: '',
      unit: '',
      quantity: '',
      unitprice:'',
      allergene:''
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
