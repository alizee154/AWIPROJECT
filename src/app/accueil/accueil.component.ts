import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private ft: FicheTechniqueService,private router: Router)  { }

  ngOnInit(): void {
  }
  onForm(){
    this.router.navigate(['formRecette']);
  }

}
