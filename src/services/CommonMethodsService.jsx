import APIKit, { setClientToken } from "../http/APIKit";
import CookieService from "../http/CookieService"

class CommonMethodsService {

  setToken() {
    CookieService.getToken()
      .then((response) => {
        setClientToken(response);
      })
      .catch((e) => {
        "";
      });
  }

  getAll(url) {
    this.setToken();
    return APIKit.get(`${url}`);
  }

  get(id) {
    this.setToken();
    return APIKit.get(`/getSolicitudesPasesSalidaByEstado/${id}`);
  }

  getBy(url, data) {
    this.setToken();
    return APIKit.get(`${url}/${data}`);
  }

  post(url, data) {
    this.setToken();
    return APIKit.post(url, data);
  }

  put(url, data) {
    this.setToken();
    return APIKit.put(url, data);
  }

  delete(url, id) {
    this.setToken();
    return APIKit.delete(`${url}/${id}`);
  }

  deleteAll() {
    this.setToken();
    return APIKit.delete(`/tutorials`);
  }

  findByTitle(title) {
    this.setToken();
    return APIKit.get(`/tutorials?title=${title}`);
  }
}

export default new CommonMethodsService();