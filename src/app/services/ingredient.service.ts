import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FicheTechnique} from "../models/fiche-technique";
import {of, Subject, tap} from "rxjs";
import {NgForm} from "@angular/forms";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Ingredient} from "../models/ingredient";
import {Categorie} from "../models/category";
import {Vente} from "../models/vente";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ventes : Vente = {name : 'nouilles',nbPlat:'3'};
  ingToDecrease : Ingredient[];
  quantToDecrease : number;
  private ing = [];
  recetteSubject = new Subject<FicheTechnique[]>();
  ingredientSubject = new Subject<any[]>()
  ingSubject = new Subject<any[]>();
  ingDecreaseSubject = new Subject<any[]>();
  categorySubject = new Subject<Categorie[]>();
  private ingredients = [];
  private ingCategory = [];
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


    async getIngredientByNameAddRecette(name) {
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

  async getIngByNameStocks(name) {
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    console.log(name);
    this.ingredients.splice(0, this.ingredients.length);

      const q = query(colRef, where("name", "==", name));
      await getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.ingredients.splice(0, this.ingredients.length);
          this.ingredients.push({...doc.data(), id: doc.id})
          this.emitingSubject();
          console.log(doc.id, " => ", doc.data());
          console.log(this.ingredients);
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

  async getIngByCategory(category) {
    this.ingCategory.splice(0, this.ingCategory.length);
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    const q = query(colRef, where("category", "==", category));
    await getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.ingCategory.push({...doc.data(), id: doc.id})
        this.emitIngSubjectCategory();
        console.log(doc.id, " => ", doc.data());
      })
      if (this.ingCategory.length === 0) {
        this.emitIngSubjectCategory();
      }
      console.log(this.category);
    })
      .catch(err => {
        console.log(err.message);
      })
  }

  /*addIngredientsInStep(id){
    const db = getFirestore();
    const docRef = collection(db, "??tapes/" + id);
    const newDoc = push()
  }*/

  async updateIngStocks(id, stocks) {
    const db = getFirestore();
    console.log(id);
    const docRef = doc(db, "ingredients", id);
    await updateDoc(docRef, {
      stocks : stocks
    })
      .then(r => {
        console.log('r??ussi');
      })
  }

  saveIngr??dients(ing){
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    addDoc(colRef, {
      name : ing.name,
      unit : ing.unit,
      stocks : ing.stocks,
      unitprice : ing.unitprice,
      category : ing.category,
      allergene : ing.allergene
    })
      .catch(err => console.error(err))
  }

  updateIngr??dient(quantity){
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    addDoc(colRef, {
      quantity: quantity
    }).then(r =>{
      console.log('r??ussi');
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

  newEmitingSubject(){
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

  emitIngSubjectCategory() {
    this.ingSubject.next(this.ingCategory.slice());
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
  addIngToDecrease(ingredients : Ingredient[], quantity : number){
    this.ingToDecrease = ingredients;
    console.log(this.ingToDecrease);
    this.quantToDecrease = quantity;
    console.log(this.quantToDecrease);
    ingredients[0].stocks = ingredients[0].stocks - this.quantToDecrease;
    console.log(ingredients[0].stocks);

/*
    for(var ing of this.ingToDecrease) {
      for(var ings of this.ingredients){
        if(ings == ing){
          console.log("je suis arriv?? ici");
          console.log(ings);
          var s = this.returnPostionIndexToDecrease(ing);
          console.log(s);
          console.log(ings.stocks);
          ings.stocks = ings.stocks - this.quantToDecrease[s];
          console.log(ings.stocks);
        }
      }

    }*/

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
