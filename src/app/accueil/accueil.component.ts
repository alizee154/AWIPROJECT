import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {FicheTechnique} from "../models/fiche-technique";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private ft: FicheTechniqueService,private router: Router)  {

  }

  ngOnInit(): void {
    this.ft.getAllFichesTechniques();

    this.recetteSubscription = this.ft.recetteSubject.subscribe((recettas :FicheTechnique[]) => {this.recettas = recettas;});
    this.ft.emitrecetteSubject();
    //setTimeout(this.initializeNbr,0)



  }
/*
  initializeNbr(){
    this.i = this.entierAleatoire(0, this.recettas.length);
    this.j = this.entierAleatoire(0, this.recettas.length);
    this.k = this.entierAleatoire(0, this.recettas.length);
    console.log(this.recettas.length)
    console.log(this.i);
    console.log(this.j);
    console.log(this.k);
  }*/
  onForm(){
    this.router.navigate(['formRecette']);
  }
  @Output() public selectedRecette = new EventEmitter<FicheTechnique>();
  @Input() id : string;

  recettas : FicheTechnique[];
  recetteSubscription : Subscription;


  entierAleatoire(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  recettes :any[];
  i: number
  j: number;
  k: number;









  onView(recette : FicheTechnique){
    //this.router.navigate(['fiche-technique/:id']);
    this.selectedRecette.emit(recette);
    console.log(recette.name)



  }

}
