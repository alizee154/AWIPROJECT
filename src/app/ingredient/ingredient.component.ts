import {Component, Input, OnInit} from '@angular/core';
import {FicheTechnique} from "../models/fiche-technique";
import {Subscription} from "rxjs";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Ingredient} from "../models/ingredient";
import {IngredientService} from "../services/ingredient.service";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Input() id : string = '1';
  @Input() name : string = 'r';
  @Input() unit : string = 'Alizée';
  @Input() category : string = 'patisserie';
  @Input() stocks : number = 0;
  @Input() unitprice : number = 0;

  @Input() allergene : string = 'oui';


  ingredients: Ingredient[] = [];
  ingSubscription : Subscription;


  constructor(private ing: IngredientService, private router: Router) { }
  getName() {
    return this.name;
  }

  public deleteIng(id){
    this.ing.deleteIngredient(id);
    this.router.navigate(['/ingredient']).catch(err => console.error(err));
    this.ing.getAllIngredients();

  }


  ngOnInit() {


  }
  onView(){
    this.router.navigate(['/ingredient']);
  }
}
