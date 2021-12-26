import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FicheTechnique} from "../models/fiche-technique";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Etape} from "../models/etape";

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

  @Input() listEtape : Etape [] = [];

  recettes: FicheTechnique[] = [];
  recetteSubscription : Subscription;


  constructor(private ft: FicheTechniqueService, private router: Router) { }

  getName() {
    return this.name;
  }

  getRecetteID(){
    //console.log(this.id);
    return this.id;

  }


  ngOnInit() {}






}
