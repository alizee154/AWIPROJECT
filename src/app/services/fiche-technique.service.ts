import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../models/ingredient";
import {Etape} from "../models/etape";
import {Vente} from "../models/vente";

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection : AngularFirestoreCollection<FicheTechnique>;
  tab : number[] = [];
  //ventes : Vente[] = [{name : 'nouilles',nbPlat:'3'}];
  ventes : Vente = {name :'', nbPlat: ''};
  private recettas : FicheTechnique[] = [
    {
      id : 'e',
      name:'moule',
      author:'ee',
      desc:'hey',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : [],
      nbIngredientsByStep : [],
      listQuantityIngredients : []


    }
  ];
  recetteSubject = new Subject<FicheTechnique[]>();
  ingSubject = new Subject<any[]>();
  nbSubject = new Subject<any[]>();


  private recettes = [
    {
      id:'4',
      name: 'couscous',
      author:'goug',
      desc:'hello',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : [],
      nbIngredientsByStep : []

    },
    {
      id:'2',
      name: 'sushi',
      author:'gaetan',
      desc:'hello world',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : [],
      nbIngredientsByStep : []
    }

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

  addTab(tab : number[]){
    this.tab = tab;
  }
  addVente(vente: Vente) {
    this.ventes = {name :'', nbPlat: ''};
    this.ventes = vente;
    this.emitrecetteSubject();
    console.log(this.ventes);
  }
  fichesVendues: FicheTechnique  = {
    id : 'e',
    name:'moule',
    author:'ee',
    desc:'hey',
    listTitresEtapes:[],
    listDureesEtapes:[],
    listIngEtapes : [],
    nbIngredientsByStep : [],
    listQuantityIngredients : []


  };
  nbFichesVendues : String  = '';
  ingToDecrease : String[] = [];
  ingNameToDecrease : String[] = [];
  quantityToDecrease : number[] = [];
  //quantityPeringredient : number[] = [];

  recupIngTodecrease(){ //on recupere les fiches techniques vendues
    this.ingNameToDecrease = [];
    this.ingToDecrease = [];
    this.quantityToDecrease = [];
    this.nbFichesVendues = '';
    this.fichesVendues = {id : 'e',
      name:'',
      author:'',
      desc:'',
      listTitresEtapes:[],
      listDureesEtapes:[],
      listIngEtapes : [],
      nbIngredientsByStep : [],
      listQuantityIngredients : []};


       this.fichesVendues = this.getRecetteByname(this.ventes.name);
       this.nbFichesVendues = this.ventes.nbPlat;//mettre le meme nombre pour tous les ingredients d'une meme etape




    console.log(this.nbFichesVendues);
    console.log(this.fichesVendues + "hey");

      /*for(let i in this.fichesVendues[index].nbIngredientsByStep){


      }*/

      for(let i in  this.fichesVendues.listIngEtapes){
        console.log(this.fichesVendues.listIngEtapes[i]);
        this.ingNameToDecrease.push(this.fichesVendues.listIngEtapes[i]);
        console.log(this.fichesVendues.listQuantityIngredients[i]);
        console.log(this.nbFichesVendues);// 0 car il faut que je remette les ventes a vide car une vente a la fois

        //this.quantityPeringredient.push(this.fichesVendues[index].listQuantityIngredients[i]);
        var y: number = +this.nbFichesVendues;
        console.log(y);
        var somme : number = y*this.fichesVendues.listQuantityIngredients[i];
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


  getRecetteById(id : string){
    const recette = this.recettas.find(
      (recetteObject) => {
        return recetteObject.id === id;
    }
    );
    return recette;
  }

  getRecetteByname(name : String ){
    const recette = this.recettas.find(
      (recetteObject) => {
        return recetteObject.name=== name;
      }
    );
    return recette;

  }





  exampleGetCollection(){
    return this.ficheTechniqueStore.collection('ficheTechnique');
  }
}
