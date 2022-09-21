export class PhoneModel {
  public _id: string;
  public name: string;
  public description: string;
  public brand_id: string;
  public price: number;
  public rating: number;
  public picture: string;
  public on_top: boolean;

  constructor(phone: PhoneModel) {
    this._id = phone._id;
    this.name = phone.name;
    this.description = phone.description;
    this.brand_id = phone.brand_id;
    this.price = phone.price;
    this.rating = phone.rating;
    this.picture = phone.picture;
    this.on_top = phone.on_top;
  };
};