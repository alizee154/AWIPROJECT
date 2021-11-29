import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { FicheTechnique } from './models/fiche-technique';
import { FicheTechniqueService } from './services/fiche-technique.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyRecipe';
  fichesTechniques: AngularFirestoreCollection;

  constructor(private ficheTechniqueService : FicheTechniqueService){}

  //ngOnInit(){
    //this.fichesTechniques = this.ficheTechniqueService.exampleGetCollection();
  //}

}
