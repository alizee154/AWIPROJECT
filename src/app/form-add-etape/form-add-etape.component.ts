import {Component, Input, OnInit} from '@angular/core';
import {FicheTechnique} from "../models/fiche-technique";
import {Etape} from "../models/etape";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-add-etape',
  templateUrl: './form-add-etape.component.html',
  styleUrls: ['./form-add-etape.component.css']
})
export class FormAddEtapeComponent implements OnInit {


  @Input() etape : Etape;
  titleControl : FormControl;

  EtapeForm : FormGroup;

  constructor(private formBuilder: FormBuilder,private ft:FicheTechniqueService,private router: Router) { }

  ngOnInit() {

  }



  /*onSubmit(form: NgForm) {
    const titreEtape = form.value['titreEtape'];
    const duree = form.value['duree'];
    const descEtape = form.value['descetape'];
    const listeIng = form.value['listeIng'];

    console.log(form.value);
    this.ft.addEtape(titreEtape,descEtape,listeIng,duree);
    this.router.navigate(['/fiche-technique']);
  }*/

}
