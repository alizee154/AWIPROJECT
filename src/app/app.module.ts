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

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },

  { path: 'fiche-technique', component: FicheTechniqueComponent },
  { path: 'ingredient', component: IngredientComponent },
  { path: 'stock', component: StockComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FicheTechniqueComponent,
    FormAddRecetteComponent,
    IngredientComponent,
    StockComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [FicheTechniqueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
