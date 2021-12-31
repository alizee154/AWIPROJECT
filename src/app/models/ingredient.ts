export class Ingredient{
  public id: string;
  public name: string;
  public unit: string;
  public quantity: number;
  public unitprice: number;
  public category: string;
  public allergene : string;



  constructor(
    id: string,
    name: string,
    unit: string,
    quantity: number,
    unitprice: number,
    category: string,
    allergene: string

  ){
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.quantity = quantity;
    this.unitprice = unitprice;
    this.category = category;
    this.allergene = allergene;

  }
}
