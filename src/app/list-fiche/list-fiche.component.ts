import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FicheTechnique} from "../models/fiche-technique";

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {
  @Output() public selectedRecette = new EventEmitter<FicheTechnique>();
  @Input() id : string;

  recetteOne = 'couscous';
  recetteTwo = 'sushi';
  recetteSubscription : Subscription;
  recettes :any[];

  constructor(private ft: FicheTechniqueService,private router: Router) { }

  ngOnInit(): void {
    this.recetteSubscription = this.ft.recetteSubject.subscribe((recettes :any[]) => {this.recettes = recettes;});
    this.ft.emitrecetteSubject();
  }
  onAllumer() {
    console.log('On allume tout !');
  }
  onForm(){
    this.router.navigate(['formRecette']);
  }
  onView(recette : FicheTechnique){
    //this.router.navigate(['fiche-technique/:id']);
    this.selectedRecette.emit(recette);
    console.log(recette.name)



  }

}
