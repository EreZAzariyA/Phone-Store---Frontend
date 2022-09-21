import axios from "axios";
import config from "../Utils/Config";
import { PhoneModel } from "../Models/phone-model";
import { BrandModel } from "../Models/brand-model";

class StoreServices {
  async getTopThreeProducts(): Promise<PhoneModel[]>{
    const response = await axios.get<PhoneModel[]>(config.urls.store.topThree);
    const topThree = response.data;
    return topThree;
  };

  async getTopBrands(): Promise<BrandModel[]>{
    const response = await axios.get<BrandModel[]>(config.urls.store.topBrands);
    const topBrands = response.data;
    return topBrands;
  };
};

const storeServices = new StoreServices();
export default storeServices;