import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';
import {Observable, of, Subject, tap} from "rxjs";
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
  query, updateDoc,
  where
} from "@angular/fire/firestore";
import {Categorie} from "../models/category";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Ingredient} from "../models/ingredient";
import {Etape} from "../models/etape";
import {Vente} from "../models/vente";

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection: AngularFirestoreCollection<FicheTechnique>;
  tab: number[] = [];
  recetteSubject = new Subject<FicheTechnique[]>();
  categorySubject = new Subject<Categorie[]>();
  ingSubject = new Subject<any[]>();
  recettes = [];
  private r = [];
  private recettesCategory = [];
  private category = [];
  nbSubject = new Subject<any[]>();
  private http: HttpClient;
  ventes: Vente = {name: '', nbPlat: ''};


  constructor(private db: AngularFirestore) {
    this.listMessage = [];
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = db.collection(this.path);
  }

  public listMessage: string[];

  async getAllFichesTechniques() {
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
    if (document.exists()) {
      console.log("Document data :", document.data());
    } else {
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
      if (this.recettesCategory.length === 0) {
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
    if (document.exists()) {
      this.recettes.splice(0, this.recettes.length);
      this.recettes.push({...document.data(), id: document.id})
      this.emitrecetteSubject();
      console.log("Document data :", document.data());
    } else {
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

  async getFichesByIngredient(ing) {
    const db = getFirestore();
    console.log(ing);
    const colRef = collection(db, 'ficheTechnique');
    console.log(colRef);
    const q = query(colRef, where("listNameIng", 'array-contains', ing));
    this.recettes.splice(0, this.recettes.length);
    await getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.recettes.push({...doc.data(), id: doc.id})
        this.emitrecetteSubject();
        console.log(doc.id, " => ", doc.data());
      })
      if (this.recettes.length === 0) {
        this.emitrecetteSubjectCategory();
      }
      console.log(this.recettes);
    })
      .catch(err => {
        console.log(err.message);
      })
  }

  saveFichesTechniques(fiche) {
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    addDoc(colRef, {
      author: fiche.author,
      name: fiche.name,
      desc: fiche.desc,
      category: fiche.category,
      listTitresEtapes: fiche.listTitresEtapes,
      listDescEtapes : fiche.listDescEtapes,
      listDureesEtapes: fiche.listDureesEtapes,
      listIngEtapes: fiche.listIngEtapes,
      listNameIng: fiche.listNameIng,
      listQuantityIngredients: fiche.listQuantityIngredients,
      nbIngredientsByStep: fiche.nbIngredientsByStep
    })
      .then(() => {
        console.log("success!")
      })
      .catch(err => console.error(err))
  }

  async updateFicheWithCouvert(id, quantity) {
    const db = getFirestore();
    const docRef = doc(db, "ficheTechnique", id);
    await updateDoc(docRef, {
      listQuantityIngredients: quantity
    })
      .then(r => {
        console.log('réussi');
      })
  }

  deleteFicheTechnique(id) {
    const db = getFirestore();
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

  addTab(tab: number[]) {
    this.tab = tab;
  }

  addVente(vente: Vente) {
    this.ventes = {name: '', nbPlat: ''};
    this.ventes = vente;
    this.emitrecetteSubject();
    console.log(this.ventes);
  }

  fichesVendues: FicheTechnique = {
    id: 'e',
    name: 'moule',
    author: 'ee',
    desc: 'hey',
    listTitresEtapes: [],
    listDescEtapes: [],
    listDureesEtapes: [],
    listIngEtapes: [],
    listNameIng: [],
    nbIngredientsByStep: [],
    listQuantityIngredients: [],
    category: ''


  };
  nbFichesVendues: String = '';
  ingToDecrease: String[] = [];
  ingNameToDecrease: String[] = [];
  quantityToDecrease: number[] = [];

  //quantityPeringredient : number[] = [];

  recupIngTodecrease() { //on recupere les fiches techniques vendues
    this.ingNameToDecrease = [];
    this.ingToDecrease = [];
    this.quantityToDecrease = [];
    this.nbFichesVendues = '';
    this.fichesVendues = {
      id: 'e',
      name: '',
      author: '',
      desc: '',
      listTitresEtapes: [],
      listDescEtapes: [],
      listDureesEtapes: [],
      listIngEtapes: [],
      listNameIng: [],
      nbIngredientsByStep: [],
      listQuantityIngredients: [],
      category: ''
    };


    this.fichesVendues = this.getRecetteByname(this.ventes.name);
    this.nbFichesVendues = this.ventes.nbPlat;//mettre le meme nombre pour tous les ingredients d'une meme etape


    console.log(this.nbFichesVendues);
    console.log(this.fichesVendues);

    /*for(let i in this.fichesVendues[index].nbIngredientsByStep){


    }*/

    for (let i in this.fichesVendues.listIngEtapes) {
      console.log(this.fichesVendues.listIngEtapes[i]);
      this.ingNameToDecrease.push(this.fichesVendues.listIngEtapes[i].name);
      console.log(this.fichesVendues.listQuantityIngredients[i]);
      console.log(this.nbFichesVendues);// 0 car il faut que je remette les ventes a vide car une vente a la fois

      //this.quantityPeringredient.push(this.fichesVendues[index].listQuantityIngredients[i]);
      var y: number = +this.nbFichesVendues;
      console.log(y);
      var somme: number = y * this.fichesVendues.listQuantityIngredients[i];
      console.log(somme);
      this.quantityToDecrease.push(somme);
      console.log(this.ingNameToDecrease);
      console.log(this.quantityToDecrease);


    }


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


  getRecetteById(id: string) {
    const recette = this.recettes.find(
      (recetteObject) => {
        return recetteObject.id === id;
      }
    );
    return recette;
  }

  getRecetteByname(name: String) {
    const recette = this.recettes.find(
      (recetteObject) => {
        return recetteObject.name === name;
      }
    );
    return recette;

  }

  fetchRecettes() {
    if (this.r && this.r.length) {
      console.log('1');
      console.log(this.r.length);
      return of(this.r)
    } else {
      console.log('2');
      console.log(this.recettes);
      return of(this.recettes).pipe(
        tap(r => this.r = r)
      )
    }
  }

  searchByName(name): Observable<FicheTechnique[]> {
    const filter = `{"where":{"name":{"like":"%${name}%"}}}`;
    const params = new HttpParams().set('filter', filter);
    console.log(filter);
    console.log(params);
    console.log(this.http.get<FicheTechnique[]>('http://localhost:4200/fiche-technique', {params}));
    return this.http.get<FicheTechnique[]>('http://localhost:4200/fiche-technique', {params});


  }
}
