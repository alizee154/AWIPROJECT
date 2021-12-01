import {Component, Input, OnInit} from '@angular/core';
import {FicheTechnique} from "../models/fiche-technique";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-fiche-technique',
  templateUrl: './fiche-technique.component.html',
  styleUrls: ['./fiche-technique.component.css']
})
export class FicheTechniqueComponent implements OnInit {
  @Input() id : string = '1';
  @Input() name : string ;
  @Input() author : string = 'Alizée';
  @Input() desc : string = 'pate chocolat';

  recettes: FicheTechnique[] = [];
  recetteSubscription : Subscription;


  constructor(private ft: FicheTechniqueService) { }
  getName() {
    return this.name;
  }


  ngOnInit() {}
  /*ngOnInit() {
    this.recetteSubscription = this.ft.recetteSubject.subscribe(
      (recettes: FicheTechnique[]) => {
        this.recettes = recettes;
      }
    );

    this.ft.emitUsers();
  }
*/




}
