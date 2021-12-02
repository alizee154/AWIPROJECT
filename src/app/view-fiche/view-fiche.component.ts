import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-fiche',
  templateUrl: './view-fiche.component.html',
  styleUrls: ['./view-fiche.component.css']
})
export class ViewFicheComponent implements OnInit {

  recette :any;

  constructor(private ft: FicheTechniqueService,private router: Router) { }

  ngOnInit(): void {
    this.recette = this.ft.recette;
  }
}
