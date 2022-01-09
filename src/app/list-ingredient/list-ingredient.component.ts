import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IngredientService} from "../services/ingredient.service";
import {Ingredient} from "../models/ingredient";
import {IngredientComponent} from "../ingredient/ingredient.component";
import {Categorie} from "../models/category";

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css']
})
export class ListIngredientComponent implements OnInit {

  ingOne = 'beurre';
  ingTwo = 'chocolat';
  ingDecreaseSubscription : Subscription;
  ingSubscription : Subscription;
  categorySubscription : Subscription
  ingredients :any[];
  ventes: any[];
  categories : any[];
  selectedCategory: string;
  recetteSubscription : Subscription;
  ingredientsToDecrease : Ingredient[];

  constructor(private ing: IngredientService,private router: Router,private ft: FicheTechniqueService) { }

  ngOnInit(): void {
    this.ingSubscription = this.ing.ingSubject.subscribe((ingredients :any[]) => {this.ingredients = ingredients;});
    this.ing.getAllIngredients();
    this.ing.getAllCategories();
    this.ing.emitingSubject();
    this.ing
    console.log("salut")
    this.categorySubscription = this.ing.categorySubject.subscribe(
      (categories : Categorie[]) => {this.categories = categories}
    );

   //this.ingDecreaseSubscription = this.ing.ingDecreaseSubject.subscribe((ingredients :any[]) => {this.ingredientsToDecrease = ingredients;});

    //this.ing.newEmitingSubject();
    //console.log(this.ingredientsToDecrease);


    //this.ingredientsToDecrease = this.ing.ingToDecrease;


  }

  public onClick(){
    console.log(this.selectedCategory);
    if(this.selectedCategory === 'Toutes categories'){
      this.ing.getAllIngredients();
    }
    else{
      this.ing.getIngByCategory(this.selectedCategory).then(r => {
        console.log("success!")
      }).catch(err => console.error(err));
      console.log(this.selectedCategory);
    }
  }



  onForm(){
    this.router.navigate(['formIng']);
  }

}
