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

  constructor(private ft: FicheTechniqueService,private router: Router)  { }

  ngOnInit(): void {
    this.recetteSubscription = this.ft.recetteSubject.subscribe((recettas :FicheTechnique[]) => {this.recettas = recettas;});
    this.ft.emitrecetteSubject();
  }
  onForm(){
    this.router.navigate(['formRecette']);
  }
  @Output() public selectedRecette = new EventEmitter<FicheTechnique>();
  @Input() id : string;

  recettas : FicheTechnique[];
  recetteSubscription : Subscription;



  recettes :any[];






  onView(recette : FicheTechnique){
    //this.router.navigate(['fiche-technique/:id']);
    this.selectedRecette.emit(recette);
    console.log(recette.name)



  }

}
