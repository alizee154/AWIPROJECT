import {Ingredient} from "./ingredient";

export class Etape{
  public titreEtape : string;
  //public descEtape : string;
  public listeIng : Ingredient[];
  public duree : string;
  public  listeQuantity : number[];

  constructor(titreEtape : string,

  listeIng : Ingredient[], duree : string, listeQuantity : number[]) {
    this.titreEtape= titreEtape;
    //this.descEtape = descEtape;
    this.listeIng = listeIng;
    this.duree = duree;
    this.listeQuantity = listeQuantity;


  }


}
