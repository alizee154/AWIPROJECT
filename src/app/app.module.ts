import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FicheTechniqueComponent } from './fiche-technique/fiche-technique.component';
import {RouterModule, Routes} from '@angular/router';
import { FormAddRecetteComponent } from './form-add-recette/form-add-recette.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { StockComponent } from './stock/stock.component';
import { AccueilComponent } from './accueil/accueil.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { FicheTechniqueService } from './services/fiche-technique.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListFicheComponent } from './list-fiche/list-fiche.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ListIngredientComponent } from './list-ingredient/list-ingredient.component';
import { ViewFicheComponent } from './view-fiche/view-fiche.component';
import { FormAddIngredientComponent } from './form-add-ingredient/form-add-ingredient.component';

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },

  { path: 'formRecette', component: FormAddRecetteComponent },
  { path: 'view', component: ViewFicheComponent },
  { path: 'formIng', component: FormAddIngredientComponent },
  { path: 'fiche-technique', component: ListFicheComponent },
  { path: 'ingredient', component: ListIngredientComponent },
  { path: 'stock', component: StockComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }

];
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FicheTechniqueComponent,
    FormAddRecetteComponent,
    IngredientComponent,
    StockComponent,
    AccueilComponent,
    ListFicheComponent,
    FourOhFourComponent,
    ListIngredientComponent,
    ViewFicheComponent,
    FormAddIngredientComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [FicheTechniqueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
