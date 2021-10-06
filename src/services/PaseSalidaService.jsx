import CommonMethodsService from "./CommonMethodsService";

class PaseSalidaService {
  async getTiposPaseSalidaList() {
    try {
      const res = await CommonMethodsService.getAll("/microserviciosRRHH/getTiposPaseSalida");
      return Promise.resolve(res);
    } catch (err) {
      console.log(err);
    }
  }

  async getEstadosPaseSalida() {
    try {
      const res = await CommonMethodsService.getAll("/microserviciosRRHH/getEstadosPaseSalida");
      return Promise.resolve(res);
    } catch (err) {
      console.log(err);
    }
  }

  async getPasesSalidaUserList(username) {
    try {
      const res = await CommonMethodsService.getAll("/paseSalidaKSRRHH/getTaskByUser/" + username);
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getPasesSalidaGrupoList() {
    try {
      const res = await CommonMethodsService.getAll("/paseSalidaKSRRHH/getTaskByGroup/jefesUDEM");
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getSolicitudPaseSalidaById(id) {
    try {
      const res = await CommonMethodsService.getBy("/microserviciosRRHH/getSolicitudPaseSalidaById", id);
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getSolicitudesPasesSalidaRep(dataObject) {
    try {
      const res = await CommonMethodsService.post("/microserviciosRRHH/getSolicitudesPasesSalidaRep", dataObject);
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getInfoPaseSalida(id) {
    try {
      const res = await CommonMethodsService.getBy("/paseSalidaKSRRHH/getTaskInputByContainerAndTaskId", id);
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getAudPaseSalidaByIdPase(id) {
    try {
      const res = await CommonMethodsService.getBy("/microserviciosRRHH/getAudPaseSalidaByIdPase", id);
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async createSolictudPaseSalida(dataObject) {
    try {
      const objectCreate = {
        numero_siarh: dataObject.numero_siarh,
        expediente_id: dataObject.expediente_id,
        solicitud_pase_salida_id: dataObject.solicitud_pase_salida_id,
        fecha: dataObject.fecha,
        solicitud_pase_salida_tipo_id: dataObject.solicitud_pase_salida_tipo_id,
        asunto: dataObject.asunto,
        hora_salida: dataObject.fecha + " " + dataObject.hora_salida,
        hora_entrada: dataObject.fecha + " " + dataObject.hora_entrada,
        hora_salida_reloj: dataObject.hora_salida_reloj,
        hora_entrada_reloj: dataObject.hora_entrada_reloj,
        solicitud_estado_id: 1,
        observaciones: dataObject.observaciones,
        usuario_sso: dataObject.usuario_sso,
        nombre_usuario_sso: dataObject.nombre_usuario_sso
      };
      
      const res = await CommonMethodsService.post("/paseSalidaKSRRHH/createSolicitudPaseSalida", objectCreate);
      
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
      return Promise.resolve(err);
    }
  }

  async updateSolictudPaseSalida(taskId, dataObject, estado) {
    try {
      const objectUpdate = {
        numero_siarh: dataObject.numero_siarh,
        expediente_id: dataObject.expediente_id,
        solicitud_pase_salida_id: dataObject.solicitud_pase_salida_id,
        fecha: dataObject.fecha,
        solicitud_pase_salida_tipo_id: dataObject.solicitud_pase_salida_tipo_id,
        asunto: dataObject.asunto,
        hora_salida: dataObject.fecha + " " + dataObject.hora_salida,
        hora_entrada: dataObject.fecha + " " + dataObject.hora_entrada,
        hora_salida_reloj: dataObject.hora_salida_reloj,
        hora_entrada_reloj: dataObject.hora_entrada_reloj,
        solicitud_estado_id: estado === "modificar" ? 2 : estado === "rechazar" ? 5 : 4,
        observaciones: dataObject.observaciones,
        usuario_sso: dataObject.usuario_sso,
        nombre_usuario_sso: dataObject.nombre_usuario_sso
      };

      const res = await CommonMethodsService.put("/paseSalidaKSRRHH/updateSolicitudPaseSalida/" + taskId, objectUpdate);

      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async abortSolicitudPaseSalida(processId) {
    try {
      const res = await CommonMethodsService.delete("/paseSalidaKSRRHH/abortSolicitudPaseSalida", processId);

      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new PaseSalidaService();