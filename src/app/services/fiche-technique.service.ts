import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../models/ingredient";
import {Etape} from "../models/etape";

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection : AngularFirestoreCollection<FicheTechnique>;
  private recettas : FicheTechnique[] = [
    {
      id : 'e',
      name:'moule',
      author:'ee',
      desc:'hey',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : []


    }
  ];
  recetteSubject = new Subject<FicheTechnique[]>();
  ingSubject = new Subject<any[]>();


  private recettes = [
    {
      id:'4',
      name: 'couscous',
      author:'goug',
      desc:'hello',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : []

    },
    {
      id:'2',
      name: 'sushi',
      author:'gaetan',
      desc:'hello world',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : []
    }

  ];
  recette = {
    id:'5',
    name: 'riz cantonais',
    author:'chris',
    desc:'hello wd',
    listTitresEtapes:[],
    listDureesEtapes:[],
    listIngEtapes : []
  };
  ficheTechnicas: FicheTechnique[] = [{
    id: '8',
    name: 'cookies',
    author: 'alizee',
    desc :'hello',
    listTitresEtapes:[],
    listDureesEtapes:[],
    listIngEtapes : []
  },

    ];



  constructor(private db: AngularFirestore){
    this.listMessage = [];
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = db.collection(this.path);
  }
  public listMessage: string[];



  /*emitUsers() {
    this.recetteSubject.next(this.ficheTechnicas.slice());
  }*/
  onSubmit(form: NgForm) {
    const id = form.value['id'];
    const name = form.value['name'];
    const author = form.value['author'];
    const desc = form.value['desc'];
  }
  emitrecetteSubject() {
    this.recetteSubject.next(this.recettas.slice());
  }


  addRecette(recette: FicheTechnique) {
    this.recettas.push(recette);
    this.emitrecetteSubject();
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
    const recette = this.recettas.find(
      (recetteObject) => {
        return recetteObject.id === id;
    }
    );
    return recette;
  }





  exampleGetCollection(){
    return this.ficheTechniqueStore.collection('ficheTechnique');
  }
}
