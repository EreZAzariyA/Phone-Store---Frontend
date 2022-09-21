import axios from "axios";
import { BrandModel } from "../Models/brand-model";
import config from "../Utils/Config";
import store from "../Redux/Store";
import { addNewBrandAction, fetchBrandsAction, removeBrandAction, updateBrandAction } from "../Redux/slicers/store-slicer";

class BrandsServices {
  async getAllBrands(): Promise<BrandModel[]> {
    const response = await axios.get<BrandModel[]>(config.urls.brands);
    const brands = response.data;
    store.dispatch(fetchBrandsAction(brands));
    return brands;
  };

  async getOneBrand(brand_id: string): Promise<BrandModel> {
    if (store.getState().store.brands.length === 0) {
      const response = await axios.get(config.urls.brands + brand_id);
      const brand = response.data;
      return brand;
    } else {
      const brand = store.getState().store.brands.find(brand => brand._id === brand_id);
      return brand;
    }
  };

  async addNewBrand(brand: BrandModel): Promise<BrandModel> {
    const response = await axios.post<BrandModel>(config.urls.brands, brand);
    const addedBrand = response.data;
    store.dispatch(addNewBrandAction(addedBrand));
    return addedBrand;
  };

  async updateBrand(brandToUpdate: BrandModel): Promise<BrandModel>{
    const response = await axios.put<BrandModel>(config.urls.brands, brandToUpdate);
    const updatedBrand = response.data;
    store.dispatch(updateBrandAction(updatedBrand));
    return updatedBrand;
  };

  async deleteBrand(brand_id: string): Promise<void> {
    await axios.delete(config.urls.brands + brand_id);
    store.dispatch(removeBrandAction(brand_id));
  };
};

const brandsServices = new BrandsServices();
export default brandsServices;