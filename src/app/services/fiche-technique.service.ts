import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FicheTechnique } from '../models/fiche-technique';

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {
  private path = '/fiche-technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection : AngularFirestoreCollection<FicheTechnique>;

  constructor(private db: AngularFirestore){
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = db.collection(this.path);
  }

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
