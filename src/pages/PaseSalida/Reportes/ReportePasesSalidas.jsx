import React from 'react';

const divStyle = {
    fontFamily: "Arial"    
  }

const table1Style = {
    margin: "15px",
    fontSize: "10px"
};

const table2Style = {
    margin: "15px", 
    width: "100%",
    fontSize: "10px"
};

const tdStyle = {
    fontWeight: "bold",
};

const h3Style = {
    textAlign: "center",
    fontSize: "12px",
    marginTop: "15px"
};

class ReportePasesSalidas extends React.Component {

    render() {
        var paseSalidasList = this.props.lista.map((row, index) => {

            return <tr key={row.solicitud_pase_salida_id}>
                <td>{row.asunto}</td>
                <td>{row.fecha}</td>
                <td>{row.hora_salida}</td>
                <td>{row.hora_entrada}</td>
                <td>{row.solicitud_estado}</td>
            </tr>

        })

        return (
            <div style={divStyle}>
                <h3 style={h3Style}>Reporte de solicitudes de pase de salida</h3>                
                <table style={table1Style}>
                    <thead>
                        <tr>
                            <td style={tdStyle}>Fecha desde: </td><td>{this.props.criteriosBusqueda.fecha_desde}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Fecha Hasta: </td><td>{this.props.criteriosBusqueda.fecha_hasta}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Estado solicitud: </td><td>{this.props.criteriosBusqueda.estado}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Tipo solicitud: </td><td>{this.props.criteriosBusqueda.tipo}</td>
                        </tr>
                    </thead>
                </table>
                <table style={table2Style}>
                    <thead>
                        <tr>
                            <td style={tdStyle}>Asunto</td>
                            <td style={tdStyle}>Fecha solicitud</td>
                            <td style={tdStyle}>Fecha y hora salida</td>
                            <td style={tdStyle}>Fecha y hora entrada</td>
                            <td style={tdStyle}>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        {paseSalidasList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ReportePasesSalidas;