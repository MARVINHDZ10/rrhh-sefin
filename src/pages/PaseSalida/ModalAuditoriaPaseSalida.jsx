import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { ButtonCustomized } from "../../components/Button";
import PaseSalidaService from "../../services/PaseSalidaService";
import TableCustomized from "../../components/TableCustomized";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import OrderTable from '../../components/OrderTable';
import * as moment from 'moment';

const headCells = [
   
    { id: 'asunto', numeric: true, disablePadding: false, sortcolum: true, label: 'Asunto' },
    { id: 'nombre_usuario_sso', numeric: false, disablePadding: false, sortcolum: false, label: 'Nombre Usuario'},
    { id: 'solicitud_pase_salida_tipo', numeric: true, disablePadding: false, sortcolum: true, label: 'Tipo Solicitud' },   
    { id: 'solicitud_estado', numeric: false, disablePadding: false, sortcolum: false, label: 'Solicitud Estado'}, 
    { id: 'fecha', numeric: true, disablePadding: false, sortcolum: true, label: 'Fecha' },   
    { id: 'observaciones', numeric: true, disablePadding: false, sortcolum: true, label: 'Observaciones' } 
    
];

function ModalAuditoriaPaseSalida(props) {

    const [currentState, setCurrentState] = useState();
    
    const changeOrderCallBack = (value) => {
        setCurrentState({ ...currentState, "order": value });
    }
    
    const changeOrderByCallBack = (value) => {
        setCurrentState({ ...currentState, "orderby": value });
    }
    
    const changePageCallBack = (value) => {
        setCurrentState({ ...currentState, "page": value });
    }
    
    const changeRowsCallBack = (value) => {
        setCurrentState({ ...currentState, "rows": value });
    }
    const changeRowsPerPageCallBack = (value) => {
        setCurrentState({ ...currentState, "rowsperpage": value });
    }
    
    const searchTableCallBack = (searchedVal) => {
        const filteredRows = currentState.originalrows.filter((row) => {
            return row.asunto.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setCurrentState({ ...currentState, "rows": filteredRows });
    }

    useEffect(() => {
        if (props.item != null && props.show === +true) {
            PaseSalidaService.getInfoPaseSalida(props.item.task_id)
                .then((response) => {
                    if (response.data != null) {
                        if (response.state === "success") {
                            PaseSalidaService.getAudPaseSalidaByIdPase(response.data.solicitud.solicitudes_pase_salida.solicitud_pase_salida_id)
                                .then((response) => {
                                    if (response.data != null) {
                                        if (response.state === "success") {
                                            console.log(response.data);
                                            setCurrentState({
                                                rows: response.data,
                                                originalrows: response.data,
                                                headcells: headCells,
                                                colSpan: 6,
                                                order: 'asc',
                                                orderby: 'asunto',
                                                page: 0,
                                                rowsperpage: 5
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
    }, [props.item, props.show]);

    const lista = currentState ? currentState.rows : [];
    var paseSalidasList = currentState ? OrderTable.stableSort(lista, OrderTable.getComparator(currentState.order, currentState.orderby))
        .slice(currentState.page * currentState.rowsperpage, currentState.page * currentState.rowsperpage + currentState.rowsperpage)
        .map((row, index) => {

            return <TableRow hover key={row.auditoria_id}>
                <TableCell align="right">{row.asunto}</TableCell>   
                <TableCell align="right">{row.nombre_usuario_sso}</TableCell>   
                <TableCell align="right">{row.solicitud_pase_salida_tipo}</TableCell> 
                <TableCell align="right">{row.solicitud_estado}</TableCell> 
                <TableCell align="right">{moment(row.fecha, 'DD/MM/YYYY h:mm a').format('DD/MM/YYYY')}</TableCell> 
                <TableCell align="right">{row.observaciones}</TableCell> 
            </TableRow>

        }) : <div></div>

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Auditoria Solicitud Pase de Salida
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentState ? (
                        <TableCustomized
                        rows={currentState.rows}
                        headcells={currentState.headcells}
                        order={currentState.order}
                        orderby={currentState.orderby}
                        colSpan={currentState.colSpan}
                        rowsperpage={currentState.rowsperpage}
                        page={currentState.page}
                        paseSalidasList={paseSalidasList}
                        changeOrder={changeOrderCallBack}
                        changeOrderBy={changeOrderByCallBack}
                        changePage={changePageCallBack}
                        changeRows={changeRowsCallBack}
                        changeRowsPerPage={changeRowsPerPageCallBack}
                        searchTable={searchTableCallBack} />
                    ) : (
                        <div>
                        </div>)}

                    

                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomized className='btns'
                        buttonColor='primary'
                        buttonSize='medium'
                        onClick={props.onHide}>Cerrar</ButtonCustomized>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ModalAuditoriaPaseSalida;