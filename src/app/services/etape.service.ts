import { Injectable } from '@angular/core';
import {collection, doc, getDoc, getDocs, getFirestore} from "@angular/fire/firestore";
import {Subject} from "rxjs";
import {FicheTechnique} from "../models/fiche-technique";
import {Etape} from "../models/etape";

@Injectable({
  providedIn: 'root'
})
export class EtapeService {
  private etapes = [];
  etapeSubject = new Subject<Etape[]>();

  constructor() { }

  getAllEtapes() {
    this.etapes.splice(0, this.etapes.length);
    const db = getFirestore();
    const colRef = collection(db, 'étapes');
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.etapes.push({...doc.data(), id: doc.id})
          this.emitEtapesSubject();
        })
        console.log(this.etapes);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  async getEtapeByID(id) {
    const db = getFirestore();
    const docRef = doc(db, "étapes", id);
    const document = await getDoc(docRef);
    if(document.exists()){
      console.log("Document data :", document.data());
    }
    else{
      console.log("Document not exists");
      alert("La recette " + id + " n'existe pas !");
    }
  }

  emitEtapesSubject() {
    this.etapeSubject.next(this.etapes.slice());
  }
}
