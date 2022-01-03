import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IngredientService} from "../services/ingredient.service";
import {Ingredient} from "../models/ingredient";
import {IngredientComponent} from "../ingredient/ingredient.component";

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
  ingredients :any[];
  ventes: any[];
  recetteSubscription : Subscription;
  ingredientsToDecrease : Ingredient[];

  constructor(private ing: IngredientService,private router: Router,private ft: FicheTechniqueService) { }

  ngOnInit(): void {
    this.ingSubscription = this.ing.ingSubject.subscribe((ingredients :any[]) => {this.ingredients = ingredients;});
    this.ing.getAllIngredients();
    this.ing.emitingSubject();
    console.log("salut")

   //this.ingDecreaseSubscription = this.ing.ingDecreaseSubject.subscribe((ingredients :any[]) => {this.ingredientsToDecrease = ingredients;});

    //this.ing.newEmitingSubject();
    //console.log(this.ingredientsToDecrease);


    //this.ingredientsToDecrease = this.ing.ingToDecrease;


  }



  onForm(){
    this.router.navigate(['formIng']);
  }

}
