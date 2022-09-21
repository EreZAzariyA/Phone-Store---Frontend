import axios from "axios";
import store from "../Redux/Store";

class InterceptorsService {

  public createInterceptors(): void {
    axios.interceptors.request.use((request)=>{
      const token = store.getState().auth.token;
      if (token) {
        request.headers = {
          authorization: "Bearer " + token
        };
      }

      return request;
    });
  };

};

const interceptorsService = new InterceptorsService();
export default interceptorsService;