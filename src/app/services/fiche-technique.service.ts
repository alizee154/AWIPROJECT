import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../models/ingredient";
import {Etape} from "../models/etape";
import {addDoc, collection, getDocs, getFirestore} from "@angular/fire/firestore";
import {getDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection : AngularFirestoreCollection<FicheTechnique>;
  private recettas : FicheTechnique[] = [

  ];
  recetteSubject = new Subject<FicheTechnique[]>();
  ingSubject = new Subject<any[]>();


  private recettes = [

  ];
  recette = {
    id:'5',
    name: 'riz cantonais',
    author:'chris',
    desc:'hello wd',
    listEtape : ['mixer','prendre tout',['0', '2', '3', '4','4','1']],
    url:''
  };
  ficheTechnicas: FicheTechnique[] = [{
    id: '8',
    name: 'cookies',
    author: 'alizee',
    desc :'hello',
    listEtape : [],
    url:''
  },

    ];



  constructor(private db: AngularFirestore){
    this.listMessage = [];
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = db.collection(this.path);
  }
  public listMessage: string[];

  getAllFichesTechniques(){
   this.recettes.splice(0, this.recettes.length);
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    getDocs(colRef).then((snapshot) => {
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

  saveFichesTechniques(fiche){
    const db = getFirestore();
    const colRef = collection(db, 'ficheTechnique');
    addDoc(colRef, {
      author : fiche.author,
      name: fiche.name,
      desc: fiche.desc
    }).catch(err => console.error(err))
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


  addRecette(recette: FicheTechnique) {
    this.recettas.push(recette);
    this.emitrecetteSubject();
  }



  getRecetteById(id : string){
    const recette = this.recettas.find(
      (recetteObject) => {
        return recetteObject.id === id;
    }
    );
    return recette;
  }






}
