import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../models/ingredient";
import {FicheTechnique} from "../models/fiche-technique";
import {Subscription} from "rxjs";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Vente} from "../models/vente";
import {IngredientService} from "../services/ingredient.service";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  recettes : FicheTechnique[];
  recetteSubscription : Subscription;
  stockForm : FormGroup;
  IngToDecrease : Ingredient[] = [];
  IngnameToDecrease : String[] = [];
  quantityToDecrease : number[] = [];
  constructor(private ft:FicheTechniqueService, private formBuilder : FormBuilder,private router: Router,private ins:IngredientService) { }

  ngOnInit(): void {
    this.recetteSubscription = this.ft.recetteSubject.subscribe((recettes:FicheTechnique[]) => {this.recettes = recettes;});
    this.ft.emitrecetteSubject();
    this.initForm();
    this.IngnameToDecrease = this.ft.ingNameToDecrease;//pas mettre ca ici car il passe avant le changement


  }
  initForm(){
    this.stockForm = this.formBuilder.group({
      nameRecette:'',
      nbplats:'',

    })

  }
  onSubmitForm(){

    const formValue = this.stockForm.value;
    const newVente = new Vente(
      formValue['nameRecette'],
      formValue['nbplats'],


    );
    this.ft.addVente(newVente);
    this.ft.recupIngTodecrease();
    this.IngnameToDecrease = this.ft.ingNameToDecrease;
    this.quantityToDecrease = this.ft.quantityToDecrease;
    console.log(this.IngnameToDecrease);

    let i = 0;
    for (let index in this.IngnameToDecrease){
      console.log(index);
      console.log(this.IngnameToDecrease[index])

      this.IngToDecrease[i] = this.ins.getIngredientByName(String(this.IngnameToDecrease[index]));
      i++;


    }
    this.ins.addIngToDecrease(this.IngToDecrease,this.quantityToDecrease);
    console.log(this.IngToDecrease);//remettre le vecteur ingredients a 0 (peut etre pas dans ce component)

    //this.ft.addTab(this.nbIngByStep);
    console.log(newVente);
    this.router.navigate(['/stock']);

  }


}
