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
  ingSubscription : Subscription;
  ingredients :any[];

  constructor(private ing: IngredientService,private router: Router) { }

  ngOnInit(): void {
    this.ingSubscription = this.ing.ingSubject.subscribe((ingredients :any[]) => {this.ingredients = ingredients;});
    this.ing.getAllIngredients();
    this.ing.emitingSubject();
    console.log("salut")

  }



  onForm(){
    this.router.navigate(['formIng']);
  }

}
