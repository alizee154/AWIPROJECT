import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FicheTechnique} from "../models/fiche-technique";
import {of, Subject, tap} from "rxjs";
import {NgForm} from "@angular/forms";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where} from "@angular/fire/firestore";
import {Ingredient} from "../models/ingredient";
import {Categorie} from "../models/category";
import {Vente} from "../models/vente";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ventes : Vente = {name : 'nouilles',nbPlat:'3'};
  ingToDecrease : Ingredient[];
  quantToDecrease : number[];
  private ing = [];
  ingredientSubject = new Subject<any[]>()
  ingSubject = new Subject<any[]>();
  ingDecreaseSubject = new Subject<any[]>();
  categorySubject = new Subject<Categorie[]>();
  private ingredients = [];
  private i = [];
  private category = [];
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

  getAllIngredients(){
    this.ingredients.splice(0, this.ingredients.length);
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.ingredients.push({...doc.data(), id: doc.id})
        this.emitingSubject();
      })
      console.log(this.ingredients);
    })
      .catch(err => {
        console.log(err.message);
      })
  }


    async getIngredientByName(name) {
    const db = getFirestore();
    console.log(name);
    const colRef = collection(db, 'ingredients');
    this.ing.splice(0, this.ing.length);
    for(let i = 0; i < name.length; i++){
      console.log(name[i]);
      const q = query(colRef, where("name", "==", name[i]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.ing.push({...doc.data(), id: doc.id})
        this.emitingIngSubject();
        console.log(doc.id, " => ", doc.data());
      });
    }

   /* const q = query(colRef, where("name", "==", name));
    this.ing.splice(0, this.ing.length);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.ing.push({...doc.data(), id: doc.id})
      this.emitingIngSubject();
      console.log(doc.id, " => ", doc.data());
    });
    /*await getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.ing.push({...doc.data(), id: doc.id})
        this.emitingIngSubject();
        console.log(doc.id, " => ", doc.data());
      })
      console.log(this.ing);
    })
      .catch(err => {
        console.log(err.message);
      })*/
  }

  async getIngByName(name) {
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    const q = query(colRef, where("name", "==", name));
    this.ingredients.splice(0, this.ingredients.length);
    await getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.ingredients.push({...doc.data(), id: doc.id})
        this.emitingSubject();
        console.log(doc.id, " => ", doc.data());
      })
      console.log(this.ingredients);
    })
      .catch(err => {
        console.log(err.message);
      })
  }

  async getAllCategories() {
    this.category.splice(0, this.category.length);
    const db = getFirestore();
    const colRef = collection(db, 'categorieIng');
    await getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.category.push({...doc.data(), id: doc.id})
          this.emitCategorySubject();
        })
        console.log(this.category);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  /*addIngredientsInStep(id){
    const db = getFirestore();
    const docRef = collection(db, "étapes/" + id);
    const newDoc = push()
  }*/

  saveIngrédients(ing){
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    addDoc(colRef, {
      name : ing.name,
      unit : ing.unit,
      quantity : ing.quantity,
      unitprice : ing.unitprice,
      category : ing.category,
      allergene : ing.allergene
    })
      .catch(err => console.error(err))
  }

  updateIngrédient(quantity){
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    addDoc(colRef, {
      quantity: quantity
    }).then(r =>{
      console.log('réussi');
    })
  }

  deleteIngredient(id) {
    const db = getFirestore();
    //const colRef = collection(db, 'ficheTechnique');
    deleteDoc(doc(db, "ingredients", id))
      .then(() => {
        console.log("success!")
      })
      .catch(err => console.error(err));
  }

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

  emitingIngSubject() {
    this.ingredientSubject.next(this.ing.slice());
  }

  emitCategorySubject() {
    this.categorySubject.next(this.category.slice());
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

    }

  }


  fetchIng(){
    if(this.i && this.i.length){
      console.log('1');
      console.log(this.i.length);
      return of(this.i)
    }
    else{
      console.log('2');
      console.log(this.ingredients);
      return of(this.ingredients).pipe(
        tap(i => this.i = i)
      )
    }
  }

  /*addRecette(recette: FicheTechnique) {
    this.ficheTechnicas.push(recette);
    this.emitUsers();
  }*/

  addIng(id : string, name: string, unit: string, stocks: number, unitprice: number,category : string, allergene: string) {
    const ingredientObject = {
      id: '0',
      name: '',
      unit: '',
      stocks: 0,
      unitprice:0,
      category: '',
      allergene: ''
    };
    ingredientObject.id = id;
    ingredientObject.name = name;
    ingredientObject.unit = unit;
    ingredientObject.stocks = stocks;
    ingredientObject.unitprice = unitprice;
    ingredientObject.category = category;
    ingredientObject.allergene = allergene;




    this.ingredients.push(ingredientObject);
    this.emitingSubject();
  }


}
