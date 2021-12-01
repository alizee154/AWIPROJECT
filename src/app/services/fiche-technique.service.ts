import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection : AngularFirestoreCollection<FicheTechnique>;
  recettes = [
    {
      id:'4',
      name: 'couscous',
      author:'goug',
      desc:'hello'
    },
    {
      id:'2',
      name: 'sushi',
      author:'gaetan',
      desc:'hello world'
    }

  ];
  ficheTechnicas: FicheTechnique[] = [{
    id: '4',
    name: 'cookies',
    author: 'alizee',
    desc :'hello'
  },

    ];



  constructor(private db: AngularFirestore){
    this.listMessage = [];
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = db.collection(this.path);
  }
  public listMessage: string[];

  recetteSubject = new Subject<FicheTechnique[]>();

  /*emitUsers() {
    this.recetteSubject.next(this.ficheTechnicas.slice());
  }*/
  onSubmit(form: NgForm) {
    const id = form.value['id'];
    const name = form.value['name'];
    const author = form.value['author'];
    const desc = form.value['desc'];
  }

  /*addRecette(recette: FicheTechnique) {
    this.ficheTechnicas.push(recette);
    this.emitUsers();
  }*/
  addRecette(id : string, desc : string,name: string, author: string) {
    const recetteObject = {
      id: '0',
      name: 'cookies',
      desc: 'hello',
      author: 'alizee'
    };
    recetteObject.id = id;
    recetteObject.name = name;
    recetteObject.author = author;
    recetteObject.desc = desc;

    this.ficheTechnicas.push(recetteObject);
    this.emitrecetteSubject();
  }
  emitrecetteSubject() {
    this.recetteSubject.next(this.ficheTechnicas.slice());
  }


  /*log(value: string) {
    this.listMessage.push(value);
  }*/

  /*addNewFicheTechnique(ft: FicheTechnique){
    this.ficheTechniqueCollection.doc(ft.id).get()
    .subscribe(doc => {
      if(!doc.exists) {
        this.ficheTechniqueCollection.doc(ft.id).set(Object.assign({},
          ft));
      }
    });
  }*/

  exampleGetCollection(){
    return this.ficheTechniqueStore.collection('ficheTechnique');
  }
}
