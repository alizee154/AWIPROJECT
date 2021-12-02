import { Component, OnInit } from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css']
})
export class ListIngredientComponent implements OnInit {

  constructor(private ft: FicheTechniqueService,private router: Router) { }

  ngOnInit(): void {

  }

  onForm(){
    this.router.navigate(['formIng']);
  }

}
