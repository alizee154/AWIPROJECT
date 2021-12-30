import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FicheTechnique} from "../models/fiche-technique";
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {addDoc, collection, doc, getDocs, getFirestore, query, where} from "@angular/fire/firestore";
import {Ingredient} from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  ingSubject = new Subject<any[]>();
  ingredientSubject = new Subject<any[]>()
  private ingredients = [];
  private ing = [];
 ingredient = {
    id:'5',
    name: 'riz cantonais',
   unit:'goug',
   quantity:3,
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

  /*addIngredientsInStep(id){
    const db = getFirestore();
    const docRef = collection(db, "étapes/" + id);
    const newDoc = push()
  }*/

  saveIngrédients(ing){
    console.log("bguifez")
    const db = getFirestore();
    const colRef = collection(db, 'ingredients');
    addDoc(colRef, {
      name : ing.name,
      unit : ing.unit,
      quantity : ing.quantity,
      unitprice : ing.unitprice,
      allergene : false
    }).then(() => {console.log("bhfezv")})
      .catch(err => console.error(err))
  }

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

  emitingIngSubject() {
    this.ingredientSubject.next(this.ing.slice());
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

  /*addRecette(recette: FicheTechnique) {
    this.ficheTechnicas.push(recette);
    this.emitUsers();
  }*/

  addIng(id : string, name: string, unit: string, quantity: number, unitprice: number, allergene: string) {
    const ingredientObject = {
      id: '0',
      name: '',
      unit: '',
      quantity: 0,
      unitprice:0,
      allergene: ''
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
