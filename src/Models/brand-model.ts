export class BrandModel {
  public _id: string;
  public brand: string;
  public img: string;
  public on_top: boolean;

  constructor (brand: BrandModel) {
    this._id = brand._id;
    this.brand = brand.brand;
    this.img = brand.img;
    this.on_top = brand.on_top;
  };
};