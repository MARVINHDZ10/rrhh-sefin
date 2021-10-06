import CommonMethodsService from "./CommonMethodsService";

class EmpleadosService {
  async getInfoEmpleado(data) {
    try {
      const res = await CommonMethodsService.getBy("/microserviciosRRHH/getInfoEmpleadoByUsername", data);
      return Promise.resolve(res);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new EmpleadosService();