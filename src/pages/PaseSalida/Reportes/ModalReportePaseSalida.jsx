import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { ButtonCustomized } from "../../../components/Button";
import SelectList from "../../../components/SelectList";
import InputLabel from '@material-ui/core/InputLabel';
import * as moment from 'moment';
import PaseSalidaService from "../../../services/PaseSalidaService";
registerLocale('es', es);

function ModalReportePaseSalida(props) {

    let estadosList = [];
    let tiposList = []

    estadosList.push({ value: "Todos", descripcion: "Todos" });
    props.estadospase &&
        props.estadospase.map((item, index) => (
            estadosList.push(item)
        ));

    tiposList.push({ value: "Todos", descripcion: "Todos" });
    props.tipopase &&
        props.tipopase.map((item, index) => (
            tiposList.push(item)
        ));

    const [reportePaseSalida, setReportePaseSalida] = useState();

    useEffect(() => {
        setReportePaseSalida({
            fecha_desde: new Date(),
            fecha_hasta: new Date(),
            estado: 0,
            tipo: 0
        });
    }, [props.estadospase, props.tipopase]);

    const handleValueChange = (name, value) => {
        setReportePaseSalida({ ...reportePaseSalida, [name]: value });
    };

    const selectValueCallBack = (name, value) => {
        setReportePaseSalida({ ...reportePaseSalida, [name]: value });
    }

    const handleGetSolicitudesPaseSalida = event => {
        PaseSalidaService.getSolicitudesPasesSalidaRep(reportePaseSalida)
            .then((response) => {
                if (response.state != null) {
                    if (response.state === "success") {                        
                        props.onClose(response, reportePaseSalida);
                    }
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div>
            {reportePaseSalida ? (< Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static" >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Reporte Solicitudes de Pase de Salida
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='row div_input mb-3'>
                        <div className={`col-3`}>
                            <InputLabel className="test-label labelStyle">Fecha desde</InputLabel>
                        </div>
                        <div className={"col-9 customDatePickerWidth"}>
                            <DatePicker
                                name='fecha_desde'
                                onChange={(date) => handleValueChange('fecha_desde', moment(date).format('DD/MM/YYYY'))}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                autoComplete='off'
                                dropdownMode="select"
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                fullWidth variant="outlined"
                                value={reportePaseSalida.fecha_desde}
                            />
                        </div>
                    </div>
                    <div className='row div_input mb-3'>
                        <div className={`col-3`}>
                            <InputLabel className="test-label labelStyle">Fecha hasta</InputLabel>
                        </div>
                        <div className={"col-9 customDatePickerWidth"}>
                            <DatePicker
                                name='fecha_hasta'
                                onChange={(date) => handleValueChange('fecha_hasta', moment(date).format('DD/MM/YYYY'))}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                autoComplete='off'
                                dropdownMode="select"
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                fullWidth variant="outlined"
                                value={reportePaseSalida.fecha_hasta}
                            />
                        </div>
                    </div>
                    <div className='row div_input mb-3'>
                        <div className={`col-3`}>
                            <InputLabel className="test-label labelStyle">Estado de la solicitud</InputLabel>
                        </div>
                        <div className={`col-9`}>
                            <SelectList
                                descripcion={"Selecciona un estado de pase de salida"}
                                lista={estadosList}
                                name={"estado"}
                                selectValue={selectValueCallBack} />
                        </div>
                    </div>
                    <div className='row div_input mb-3'>
                        <div className={`col-3`}>
                            <InputLabel className="test-label labelStyle">Tipo de la solicitud</InputLabel>
                        </div>
                        <div className={`col-9`}>
                            <SelectList
                                descripcion={"Selecciona un tipo de pase de salida"}
                                lista={tiposList}
                                name={"tipo"}
                                selectValue={selectValueCallBack} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomized className='btns'
                        buttonColor='primary'
                        buttonSize='medium'
                        onClick={props.onHide}>Cancelar</ButtonCustomized>
                    <ButtonCustomized className='btns'
                        buttonColor='primary'
                        buttonSize='medium'
                        type='submit'
                        onClick={handleGetSolicitudesPaseSalida}>Aceptar</ButtonCustomized>
                </Modal.Footer>
            </Modal>
            ) : (
                <div>
                </div>
            )}
        </div >
    );
}

export default ModalReportePaseSalida;