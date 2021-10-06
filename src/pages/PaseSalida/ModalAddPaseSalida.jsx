import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { ButtonCustomized } from "../../components/Button";
import InputLabel from '@material-ui/core/InputLabel';
import '../../css/AddPaseSalida.css';
import StyledRadio from "../../components/StyledRadio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import * as moment from 'moment';
import PaseSalidaService from "../../services/PaseSalidaService";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
registerLocale('es', es);

function ModalAddPaseSalida(props) {

  const [currentPaseSalida, setCurrentPaseSalida] = useState();
  const [startDate] = useState(new Date());

  useEffect(() => {
    const usuario_sso = props.usersession.usuario_sso;
    const expediente_id = props.usersession.expediente_id;
    const numero_siarh = props.usersession.numero_siarh;
    const nombre_usuario_sso = props.usersession.primer_nombre + " " + props.usersession.primer_apellido;
    if (props.item == null && props.show === + true) {
      setCurrentPaseSalida({
        numero_siarh: numero_siarh,
        expediente_id: expediente_id,
        solicitud_pase_salida_id: 0,
        fecha: new Date(),
        solicitud_pase_salida_tipo_id: 1,
        asunto: "",
        hora_salida: "",
        hora_entrada: "",
        hora_salida_reloj: 0,
        hora_entrada_reloj: 0,
        solicitud_estado_id: 0,
        observaciones: "",
        usuario_sso: usuario_sso,
        nombre_usuario_sso: nombre_usuario_sso
      });
    } else if (props.item != null && props.show === + true) {
      PaseSalidaService.getInfoPaseSalida(props.item.task_id)
        .then((response) => {
          if (response.data != null) {
            if (response.state === "success") {
              PaseSalidaService.getSolicitudPaseSalidaById(response.data.solicitud.solicitudes_pase_salida.solicitud_pase_salida_id)
                .then((response) => {
                  if (response.data != null) {
                    if (response.state === "success") {
                      setCurrentPaseSalida({
                        numero_siarh: response.data.numero_siarh,
                        expediente_id: response.data.expediente_id,
                        solicitud_pase_salida_id: response.data.solicitud_pase_salida_id,
                        fecha: moment(response.data.hora_salida, 'DD/MM/YYYY h:mm a').format('DD/MM/YYYY'),
                        solicitud_pase_salida_tipo_id: response.data.solicitud_pase_salida_tipo_id,
                        asunto: response.data.asunto,
                        hora_salida: moment(response.data.hora_salida, 'DD/MM/YYYY h:mm a').format('h:mm a'),
                        hora_entrada: moment(response.data.hora_entrada, 'DD/MM/YYYY h:mm a').format('h:mm a'),
                        hora_salida_reloj: response.data.hora_salida_reloj,
                        hora_entrada_reloj: response.data.hora_entrada_reloj,
                        solicitud_estado_id: response.data.solicitud_estado_id,
                        observaciones: response.data.observaciones ? response.data.observaciones : "",
                        usuario_sso: usuario_sso,
                        nombre_usuario_sso: nombre_usuario_sso
                      });
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [props.item, props.usersession, props.show]);

  const handleChangeRadio = (event, index) => {
    setCurrentPaseSalida({ ...currentPaseSalida, "solicitud_pase_salida_tipo_id": Number(event.target.value) });
  };

  const handleValueChange = (name, value) => {
    setCurrentPaseSalida({ ...currentPaseSalida, [name]: value });
  };

  const handleValueChangeInput = event => {
    const { name, value } = event.target;
    setCurrentPaseSalida({ ...currentPaseSalida, [name]: value });
  };

  const handleSaveUpdatePaseSalida = event => {
    if (currentPaseSalida.solicitud_pase_salida_id === 0) {
      PaseSalidaService.createSolictudPaseSalida(currentPaseSalida)
        .then((response) => {
          props.onClose(response);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      PaseSalidaService.updateSolictudPaseSalida(props.item.task_id, currentPaseSalida, "modificar")
        .then((response) => {
          props.onClose(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  const handleRechazarPaseSalida = event => {
    PaseSalidaService.updateSolictudPaseSalida(props.item.task_id, currentPaseSalida, "rechazar")
      .then((response) => {
        props.onClose(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleAprobarPaseSalida = event => {
    PaseSalidaService.updateSolictudPaseSalida(props.item.task_id, currentPaseSalida, "aprobar")
      .then((response) => {
        props.onClose(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleAbortarPaseSalida = event => {
    PaseSalidaService.abortSolicitudPaseSalida(props.item.task_proc_inst_id)
      .then((response) => {
        props.onClose(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      {currentPaseSalida ? (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static" >

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Nueva Solicitud Pase de Salida
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className='row div_input mb-3'>
              <div className={`col-3`}>
                <InputLabel className="test-label labelStyle">Fecha Salida</InputLabel>
              </div>
              <div className={"col-9 customDatePickerWidth"}>
                <DatePicker
                  name='fecha'
                  onChange={(date) => handleValueChange('fecha', moment(date).format('DD/MM/YYYY'))}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  autoComplete='off'
                  dropdownMode="select"
                  locale="es"
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  fullWidth variant="outlined"
                  value={currentPaseSalida.fecha}
                />
              </div>
            </div>
            <div className='row div_input mb-3'>
              <div className={`col-3`}>
                <InputLabel className="test-label labelStyle">Asunto</InputLabel>
              </div>
              <div className={`col-9`}>
                <Input
                  placeholder="Asunto"
                  type="text"
                  name="asunto"
                  onChange={handleValueChangeInput}
                  value={currentPaseSalida.asunto}
                />
              </div>
            </div>
            <div className='row div_input mb-3'>
              <div className={`col-3`}>
                <InputLabel className="test-label labelStyle">Tipo de pase salida</InputLabel>
              </div>
              <div className={`col-9`}>
                <FormControl component="fieldset">
                  <RadioGroup name="customized-radios" onChange={handleChangeRadio} value={currentPaseSalida.solicitud_pase_salida_tipo_id}>
                    {props.tipopase &&
                      props.tipopase.map((tipo, index) => (
                        <FormControlLabel key={tipo.value} value={tipo.value} control={<StyledRadio />} label={tipo.descripcion} />
                      ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className='row div_input mb-3'>
              <div className={`col-3`}>
                <InputLabel className="test-label labelStyle">Hora de salida</InputLabel>
              </div>
              <div className={"col-9 customDatePickerWidth"}>
                <DatePicker
                  showTimeSelect
                  showTimeSelectOnly
                  required
                  timeIntervals={15}
                  timeCaption="Time"
                  onChange={(salida) => handleValueChange('hora_salida', moment(salida).format('H:mm a'))}
                  value={currentPaseSalida.hora_salida ? moment(currentPaseSalida.hora_salida, 'h:mm a').format('h:mm a') : ''}
                />
              </div>
            </div>
            <div className='row div_input mb-3'>
              <div className={`col-3`}>
                <InputLabel className="test-label labelStyle">Hora de entrada</InputLabel>
              </div>
              <div className={"col-9 customDatePickerWidth"}>
                <DatePicker
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  onChange={(entrada) => handleValueChange('hora_entrada', moment(entrada).format('H:mm a'))}
                  value={currentPaseSalida.hora_entrada ? moment(currentPaseSalida.hora_entrada, 'h:mm a').format('h:mm a') : ''}
                />
              </div>
            </div>
            {currentPaseSalida.solicitud_pase_salida_id !== 0 && props.item ? (
              <div className='row div_input mb-3'>
                <div className={`col-3`}>
                  <InputLabel className="test-label labelStyle">Observaciones</InputLabel>
                </div>
                <div className={"col-9 customDatePickerWidth"}>
                  <TextArea
                    placeholder="Observacion"
                    type="text"
                    name="observaciones"
                    multiline="multiline"
                    maxRows="3"
                    disabled={props.item.task_description.includes("Revisar") ? false : true}
                    onChange={handleValueChangeInput}
                    value={currentPaseSalida.observaciones}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}

          </Modal.Body>

          {props.item && props.item.task_description.includes("Revisar") ? (
            <Modal.Footer>
              <ButtonCustomized className='btns'
                buttonColor='primary'
                buttonSize='medium'
                onClick={props.onHide}>Cerrar</ButtonCustomized>
              <ButtonCustomized className='btns'
                buttonColor='primary'
                buttonSize='medium'
                type='submit'
                onClick={handleRechazarPaseSalida}>Rechazar</ButtonCustomized>
              <ButtonCustomized className='btns'
                buttonColor='primary'
                buttonSize='medium'
                type='submit'
                onClick={handleAprobarPaseSalida}>Aprobar</ButtonCustomized>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <ButtonCustomized className='btns'
                buttonColor='primary'
                buttonSize='medium'
                onClick={props.onHide}>Cerrar</ButtonCustomized>
              {currentPaseSalida.solicitud_pase_salida_id !== 0 ? (
                <ButtonCustomized className='btns'
                  buttonColor='primary'
                  buttonSize='medium'
                  type='submit'
                  onClick={handleAbortarPaseSalida}>Abortar</ButtonCustomized>
              ) : (<div></div>)}
              <ButtonCustomized className='btns'
                buttonColor='primary'
                buttonSize='medium'
                type='submit'
                onClick={handleSaveUpdatePaseSalida}>Aceptar</ButtonCustomized>
            </Modal.Footer>
          )}
        </Modal>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
}

export default ModalAddPaseSalida;