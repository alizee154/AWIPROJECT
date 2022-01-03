import {Ingredient} from "./ingredient";

export class Etape{
  public titreEtape : string;
  public descEtape : string;
  public listeIng : Ingredient[];
  public duree : string;//peut-etre mettre number plutot
  public  listeQuantity : number[];

  constructor(titreEtape : string,descEtape : string,

  listeIng : Ingredient[], duree : string, listeQuantity : number[]) {
    this.titreEtape= titreEtape;
    this.descEtape = descEtape;
    this.listeIng = listeIng;
    this.duree = duree;
    this.listeQuantity = listeQuantity;


  }


}
