import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import { PhoneModel } from "../Models/phone-model";
import { addNewPhoneAction, fetchPhonesAction, removePhoneAction, updatePhoneAction } from "../Redux/slicers/store-slicer";

class PhonesServices {
  async getAllPhones(): Promise<PhoneModel[]> {
    const response = await axios.get<PhoneModel[]>(config.urls.phones);
    const phones = response.data;
    store.dispatch(fetchPhonesAction(phones));
    return phones;
  };

  async getOnePhoneById(phoneId: string): Promise<PhoneModel> {
    if (store.getState().store.phones.length === 0) {
      const response = await axios.get<PhoneModel>(config.urls.phones + phoneId);
      const phone = response.data;
      return phone;
    } else {
      const phone = store.getState().store.phones.find(phone => phone._id === phoneId);
      return phone;
    }
  };

  async getPhonesByBrandId(brand_id: string): Promise<PhoneModel[]> {
    if (store.getState().store.phones.length === 0) {
      const response = await axios.get<PhoneModel[]>(config.urls.phones + "phones-by-brand_id/" + brand_id);
      const phones = response.data;
      return phones;
    } else {
      const phonesByBrand = store.getState().store.phones.filter(phone => phone.brand_id === brand_id);
      return phonesByBrand;
    }
  };

  async addNewPhone(phone: PhoneModel): Promise<PhoneModel> {
    const response = await axios.post<PhoneModel>(config.urls.phones, phone);
    const addedPhone = response.data;
    store.dispatch(addNewPhoneAction(addedPhone));
    return addedPhone;
  };

  async updatePhone(phoneToUpdate: PhoneModel): Promise<PhoneModel> {
    const response = await axios.put<PhoneModel>(config.urls.phones, phoneToUpdate);
    const updatedPhone = response.data;
    store.dispatch(updatePhoneAction(updatedPhone));
    return updatedPhone;
  };

  async deletePhoneById(phoneIdToDelete: string): Promise<void> {
    await axios.delete(config.urls.phones + phoneIdToDelete);
    store.dispatch(removePhoneAction(phoneIdToDelete));
  };
};

const phonesServices = new PhonesServices();
export default phonesServices;