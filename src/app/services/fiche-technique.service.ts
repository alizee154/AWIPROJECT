import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';
import {of, Subject, tap} from "rxjs";
import {NgForm} from "@angular/forms";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where
} from "@angular/fire/firestore";
import {Categorie} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection : AngularFirestoreCollection<FicheTechnique>;
  tab : number[] = [];
  recetteSubject = new Subject<FicheTechnique[]>();
  categorySubject = new Subject<Categorie[]>();
  ingSubject = new Subject<any[]>();
  private recettes = [];
  private r = [];
  private recettesCategory = [];
  private category = [];
  nbSubject = new Subject<any[]>();



  constructor(private db: AngularFirestore){
    this.listMessage = [];
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = db.collection(this.path);
  }
  public listMessage: string[];

  getAllFichesTechniques() {
    this.recettes.splice(0, this.recettes.length);
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.recettes.push({...doc.data(), id: doc.id})
          this.emitrecetteSubject();
        })
        console.log(this.recettes);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  async getEtapes(id) {
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique')
    const docRef = doc(colRef, id, 'étapes')
    const document = await getDoc(docRef);
    if(document.exists()){
      console.log("Document data :", document.data());
    }
    else{
      console.log("Document not exists");
      alert("L'étape " + id + " n'existe pas !");
    }
  }

  async getAllCategories() {
    this.category.splice(0, this.category.length);
    const db = getFirestore();
    const colRef = collection(db, 'categorie');
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


  async getFichesByCategory(category) {
    this.recettesCategory.splice(0, this.recettesCategory.length);
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    const q = query(colRef, where("category", "==", category));
    await getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.recettesCategory.push({...doc.data(), id: doc.id})
        this.emitrecetteSubjectCategory();
        console.log(doc.id, " => ", doc.data());
      })
      if(this.recettesCategory.length === 0){
        this.emitrecetteSubjectCategory();
      }
      console.log(this.recettesCategory);
    })
      .catch(err => {
        console.log(err.message);
      })
  }

  async getFicheByID(id) {
    const db = getFirestore();
    const docRef = doc(db, "ficheTechnique", id);
    const document = await getDoc(docRef);
    if(document.exists()){
      this.recettes.push({...document.data(), id: document.id})
      this.emitrecetteSubject();
      console.log("Document data :", document.data());
    }
    else{
      console.log("Document not exists");
      alert("La recette " + id + " n'existe pas !");
    }
  }

  async getFichesByName(name) {
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    const q = query(colRef, where("name", "==", name));
    this.recettes.splice(0, this.recettes.length);
    await getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.recettes.push({...doc.data(), id: doc.id})
        this.emitrecetteSubject();
        console.log(doc.id, " => ", doc.data());
      })
      console.log(this.recettes);
    })
      .catch(err => {
        console.log(err.message);
      })
  }

  saveFichesTechniques(fiche){
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    addDoc(colRef, {
      author : fiche.author,
      name: fiche.name,
      desc: fiche.desc,
      category : fiche.category,
      listTitresEtapes : fiche.listTitresEtapes,
      listDureesEtapes : fiche.listDureesEtapes,
      listIngEtapes : fiche.listIngEtapes,
      nbIngredientsByStep : fiche.nbIngredientsByStep
    })
      .then(() => {
        console.log("success!")
      })
      .catch(err => console.error(err))
  }

  deleteFicheTechnique(id) {
    const db = getFirestore();
    //const colRef = collection(db, 'ficheTechnique');
    deleteDoc(doc(db, "ficheTechnique", id))
      .then(() => {
        console.log("success!")
      })
      .catch(err => console.error(err));
  }


  onSubmit(form: NgForm) {
    const id = form.value['id'];
    const name = form.value['name'];
    const author = form.value['author'];
    const desc = form.value['desc'];
  }
  emitrecetteSubject() {
    this.recetteSubject.next(this.recettes.slice());
  }

  emitrecetteSubjectCategory() {
    this.recetteSubject.next(this.recettesCategory.slice());
  }

  emitCategorySubject() {
    this.categorySubject.next(this.category.slice());
  }


  addRecette(recette: FicheTechnique) {
    this.recettes.push(recette);
    this.emitrecetteSubject();
  }
  addTab(tab : number[]){
    this.tab = tab;
  }

  /*addRecette(id : string, desc : string,name: string, author: string, listEtape : Etape[]) {
    const recetteObject = {
      id: '0',
      name: '',
      desc: '',
      author: '',
      listEtape :  []
    };
    recetteObject.id = id;
    recetteObject.name = name;
    recetteObject.author = author;
    recetteObject.desc = desc;
    recetteObject.listEtape = listEtape;

    this.recettes.push(recetteObject);
    this.emitrecetteSubject();
  }*/



  getRecetteById(id : string){
    const recette = this.recettes.find(
      (recetteObject) => {
        return recetteObject.id === id;
    }
    );
    return recette;
  }

  fetchRecettes(){
    if(this.r && this.r.length){
      console.log('1');
      console.log(this.r.length);
      return of(this.r)
    }
    else{
      console.log('2');
      console.log(this.recettes);
      return of(this.recettes).pipe(
        tap(r => this.r = r)
      )
    }
  }


}
