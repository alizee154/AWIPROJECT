import {Ingredient} from "./ingredient";

export class Etape{
  public titreEtape : string;
  //public descEtape : string;
  public listeIng : Ingredient[];
  public duree : string;

  constructor(titreEtape : string,

  listeIng : Ingredient[], duree : string) {
    this.titreEtape= titreEtape;
    //this.descEtape = descEtape;
    this.listeIng = listeIng;
    this.duree = duree;


  }


}
