import {Component, Input} from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { FicheTechnique } from './models/fiche-technique';
import { FicheTechniqueService } from './services/fiche-technique.service';
import { collection, getDocs } from '@firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'MyRecipe';
  fichesTechniques: AngularFirestoreCollection;
  recettes: any[];

  constructor(private ficheTechniqueService : FicheTechniqueService){}

  async ngOnInit(){
    this.fichesTechniques = this.ficheTechniqueService.exampleGetCollection();
    console.log(this.fichesTechniques);
    this.recettes = this.ficheTechniqueService.ficheTechnicas;

  /*const querySnapshot = await getDocs(collection(this.fichesTechniques, "ficheTechnique"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});*/
  }

}
