import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {debounceTime, map, Observable, of, startWith, Subscription} from "rxjs";
import {FicheTechnique} from "../models/fiche-technique";
import {FormControl, NgForm, Validators} from "@angular/forms";
import {Categorie} from "../models/category";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit, OnDestroy {
  @Output() public selectedRecette = new EventEmitter<FicheTechnique>();
  @Input() id : string;

  recettas : FicheTechnique[];
  recetteSubscription : Subscription;
  categorySubscription  : Subscription;
  recettes :any[];
  categories : any[];
  selectedCategory: string;
  myControl = new FormControl();
  recettesObs = of([]);
  searchModel = '';

  constructor(private ft: FicheTechniqueService,private router: Router) { }

  performFilter(recettesObs){
    console.log(recettesObs);
    return recettesObs.filter((x) => {
      //filter by what prop you want
      return x.name.toLowerCase().startsWith(this.searchModel.trim().toLowerCase())
    })
  }

  ngOnInit(): void {

    this.ft.getAllCategories();
    console.log('biufezgou');
    this.ft.getAllFichesTechniques();
    console.log('huifezfb');
    this.filterRecettes();
    //console.log(this.filterRecettes());
   /* this.filteredRecettes = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.recettes.slice())),
    );*/
    this.categorySubscription = this.ft.categorySubject.subscribe(
      (categories : Categorie[]) => {this.categories = categories}
    );
    this.recetteSubscription = this.ft.recetteSubject.subscribe(
      (recettes :FicheTechnique[]) => {this.recettes = recettes;}
    );
    this.ft.emitrecetteSubject();
    console.log('fkjhif');

  }

  filterRecettes(){
    console.log()
    this.recettesObs = this.ft.fetchRecettes().pipe(
      debounceTime(300),
      map((data) => this.performFilter(data))
    )
  }



  ngOnDestroy(){
    this.recetteSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
/*
  displayFn(recette : FicheTechnique) : string {
    return recette && recette.name ? recette.name : '';
  }

  private _filter(name : string) : FicheTechnique[] {
    const filterValue = name.toLowerCase();

    return this.recettes.filter(recette =>
    recette.name.toLowerCase().includes(filterValue));
  }*/

  public onSubmit(form: NgForm){
    const category = form.value['q'];
    this.ft.getFichesByCategory(category).then(r => {
      console.log("success!")
     // this.router.navigate(['/fiche-technique/'+id]).catch(err => console.error(err));
    }).catch(err => console.error(err));
    console.log(category);

  }

  onResearch(recette : FicheTechnique, event : any){
    if(event.isUserInput){
      console.log(recette.name);
      this.ft.getFichesByName(recette.name).then(r => {
        this.router.navigate(['/view-fiche'])
          .catch(err => console.error(err));
        console.log("success!")
      }).catch(err => console.error(err));
      console.log(recette.name);
    }
  }


  public onClick(){
    console.log(this.selectedCategory);
    if(this.selectedCategory === 'Toutes catégories'){
      this.ft.getAllFichesTechniques();
    }
    else{
      this.ft.getFichesByCategory(this.selectedCategory).then(r => {
        console.log("success!")
      }).catch(err => console.error(err));
      console.log(this.selectedCategory);
    }
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
