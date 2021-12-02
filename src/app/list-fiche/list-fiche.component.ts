import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {
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

}
