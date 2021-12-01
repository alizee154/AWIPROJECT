import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {
  recetteOne = 'couscous';
  recetteTwo = 'sushi';
  recettes :any[];

  constructor(private ft: FicheTechniqueService,private router: Router) { }

  ngOnInit(): void {
    this.recettes = this.ft.recettes;
  }
  onAllumer() {
    console.log('On allume tout !');
  }
  onForm(){
    this.router.navigate(['formRecette']);
  }

}
