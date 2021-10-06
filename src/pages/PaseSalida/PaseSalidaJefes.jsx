import React, { useState, useEffect, useRef } from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ButtonCustomized } from "../../components/Button";
import '../../css/PaseSalidaEmpleados.css';
import TableCustomized from "../../components/TableCustomized";
import InputLabel from '@material-ui/core/InputLabel';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import OrderTable from '../../components/OrderTable';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ModalAddPaseSalida from "./ModalAddPaseSalida";
import ModalAuditoriaPaseSalida from "./ModalAuditoriaPaseSalida";
import { useReactToPrint } from 'react-to-print';
import ModalReportePaseSalida from "./Reportes/ModalReportePaseSalida";
import PasesSalidasReport from "./Reportes/ReportePasesSalidas";

const headCells = [
    { id: 'fecha', numeric: false, disablePadding: false, sortcolum: true, label: 'Fecha creacion' },
    { id: 'tarea', numeric: false, disablePadding: false, sortcolum: true, label: 'Tarea' },
    { id: 'options', numeric: false, disablePadding: false, sortcolum: false, label: 'Opciones' },
];

function PaseSalidaJefes(props) {

    const [solicitudesPaseSalida, setSolicitudesPasesSalida] = useState();
    const componentRef = useRef();

    useEffect(() => {
        if (props.usersession && props.tipopase && props.estadospase) {
            setSolicitudesPasesSalida({
                modalshow: +false,
                snackshow: false,
                messagesnack: "",
                typesnack: "",
                modalReporte: +false,
                modalAuditoria: +false,
                rows: props.solicitudesjefes ? props.solicitudesjefes : [],
                originalrows: props.solicitudesjefes ? props.solicitudesjefes : [],
                headcells: headCells,
                item: null,
                colSpan: 6,
                order: 'asc',
                orderby: 'asunto',
                page: 0,
                rowsperpage: 5,
                usersession: props.usersession,
                tipopase: props.tipopase,
                estadospase: props.estadospase,
                dataReport: [],
                criteriosBusqueda: {}
            });
        }
    }, [props.usersession, props.solicitudesjefes, props.tipopase, props.estadospase]);

    const editItem = (e, item) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "item": item, "modalshow": +true });
    }

    const auditoriaItem = (e, item) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "item": item, "modalAuditoria": +true });
    }

    const openModalReportePaseSalida = () => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "item": null, "modalReporte": +true });
    }

    const closeModal = (data) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "modalshow": +false });
    }

    const closeModalReporteCallBack = (data) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "modalReporte": +false });
    }

    const closeModalAuditoriaCallBack = () => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "modalAuditoria": +false });
    }

    const reporteCallBack = (data, criteriosBusqueda) => {
        if (data != null) {
            if (data.state != null) {
                if (data.state === "success") {
                    setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "modalReporte": +false, "dataReport": data.data, "criteriosBusqueda": criteriosBusqueda });
                    handlePrint();
                }
            }
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const createUpdateFinishCallBack = (data) => {
        if (data != null) {
            if (data.state != null) {
                if (data.state === "success") {
                    setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "modalshow": +false, "snackshow": true, "messagesnack": data.message, "typesnack": "success" });
                } else {
                    setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "modalshow": +false, "snackshow": true, "messagesnack": data.message, "typesnack": "error" });
                }
            }
        }

        props.onCreateUpdate(data);
    }

    const changeOrderCallBack = (value) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "order": value });
    }

    const changeOrderByCallBack = (value) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "orderby": value });
    }

    const changePageCallBack = (value) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "page": value });
    }

    const changeRowsCallBack = (value) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "rows": value });
    }

    const changeRowsPerPageCallBack = (value) => {
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "rowsperpage": value });
    }

    const searchTableCallBack = (searchedVal) => {
        const filteredRows = solicitudesPaseSalida.originalrows.filter((row) => {
            return row.asunto.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setSolicitudesPasesSalida({ ...solicitudesPaseSalida, "rows": filteredRows });
    }

    const lista = solicitudesPaseSalida ? solicitudesPaseSalida.rows : [];
    var paseSalidasList = solicitudesPaseSalida ? OrderTable.stableSort(lista, OrderTable.getComparator(solicitudesPaseSalida.order, solicitudesPaseSalida.orderby))
        .slice(solicitudesPaseSalida.page * solicitudesPaseSalida.rowsperpage, solicitudesPaseSalida.page * solicitudesPaseSalida.rowsperpage + solicitudesPaseSalida.rowsperpage)
        .map((row, index) => {

            var d = new Date(parseInt(row.task_created_on.fecha, 10));

            return <TableRow hover key={row.correlation_key}>
                <TableCell>{moment(d, 'DD/MM/YYYY h:mm a').format('DD/MM/YYYY h:mm a')}</TableCell>
                <TableCell>{row.task_description}</TableCell>
                <TableCell>
                    <EditIcon className="editIcon" onClick={e => editItem(e, row)} />
                    <VerifiedUserIcon onClick={e => auditoriaItem(e, row)} />
                </TableCell>
            </TableRow>
        }) : <div></div>


    return (
        <div>
            {solicitudesPaseSalida ? (<div>
                <InputLabel className='titlePage'>Solicitud pase de salida prueba</InputLabel>
                <div className='row'>
                    <div className='col-12'>
                        <ButtonCustomized clase='floatR'
                            buttonColor='primary'
                            buttonSize='medium'
                            onClick={openModalReportePaseSalida}>Reporte</ButtonCustomized>
                    </div>
                </div>


                <ModalAddPaseSalida
                    show={solicitudesPaseSalida.modalshow}
                    item={solicitudesPaseSalida.item}
                    usersession={solicitudesPaseSalida.usersession}
                    tipopase={solicitudesPaseSalida.tipopase}
                    onHide={closeModal}
                    onClose={createUpdateFinishCallBack} />


                <TableCustomized
                    rows={solicitudesPaseSalida.rows}
                    headcells={solicitudesPaseSalida.headcells}
                    order={solicitudesPaseSalida.order}
                    orderby={solicitudesPaseSalida.orderby}
                    colSpan={solicitudesPaseSalida.colSpan}
                    rowsperpage={solicitudesPaseSalida.rowsperpage}
                    page={solicitudesPaseSalida.page}
                    paseSalidasList={paseSalidasList}
                    changeOrder={changeOrderCallBack}
                    changeOrderBy={changeOrderByCallBack}
                    changePage={changePageCallBack}
                    changeRows={changeRowsCallBack}
                    changeRowsPerPage={changeRowsPerPageCallBack}
                    searchTable={searchTableCallBack} />

                <ModalReportePaseSalida
                    show={solicitudesPaseSalida.modalReporte}
                    tipopase={solicitudesPaseSalida.tipopase}
                    estadospase={solicitudesPaseSalida.estadospase}
                    onHide={closeModalReporteCallBack}
                    onClose={reporteCallBack} />

                <ModalAuditoriaPaseSalida
                    show={solicitudesPaseSalida.modalAuditoria}
                    item={solicitudesPaseSalida.item}
                    onHide={closeModalAuditoriaCallBack} />

                {solicitudesPaseSalida.dataReport ? <div>
                    <div style={{ display: "none" }}>
                        <PasesSalidasReport
                            lista={solicitudesPaseSalida.dataReport}
                            criteriosBusqueda={solicitudesPaseSalida.criteriosBusqueda}
                            ref={componentRef} />
                    </div>
                </div> :
                    <div />
                }
            </div>
            ) : (<div></div>)}
        </div>
    );
}

export default PaseSalidaJefes;