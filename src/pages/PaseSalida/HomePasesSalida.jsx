import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/HomePasesSalida.css';
import PaseSalidaService from "../../services/PaseSalidaService";
import PaseSalidaEmpleados from "./PaseSalidaEmpleados";
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PaseSalidaJefes from "./PaseSalidaJefes";
import SnackbarAlert from "../../components/SnackbarAlert";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class HomePasesSalida extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valuetab: 0,
      showtabjefe: false,
      solicitudesempleados: [],
      usersession: props.usersession,
      tipopase: [],
      estadospase: [],
      solicitudesjefes: [],
      snackshow: false,
      messagesnack: "",
      typesnack: ""

    };

    this.printRef = React.createRef();
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.getTiposPaseSalida();
    this.getPasesSalidaUser();
    this.getPasesSalidaGrupo();
    this.getEstadosPaseSalida();
    this.validateRoles();
  }

  validateRoles() {
    this.props.roles &&
      this.props.roles.map((item, index) =>
        item.includes("jefesUDEM") ? this.setState({ showtabjefe: true }) : ""
      );
  }

  getPasesSalidaUser() {
    PaseSalidaService.getPasesSalidaUserList(this.state.usersession.usuario_sso)
      .then((response) => {
        if (response.data != null) {
          if (response.state === "success") {
            this.setState({ solicitudesempleados: response.data.task_summary });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getPasesSalidaGrupo() {
    PaseSalidaService.getPasesSalidaGrupoList()
      .then((response) => {
        if (response.data != null) {
          if (response.state === "success") {
            this.setState({ solicitudesjefes: response.data.task_summary });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getTiposPaseSalida() {
    PaseSalidaService.getTiposPaseSalidaList()
      .then((response) => {
        if (response.data != null) {
          if (response.data.state === "success") {
            this.setState({ tipopase: response.data.data });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getEstadosPaseSalida() {
    PaseSalidaService.getEstadosPaseSalida()
      .then((response) => {
        if (response.data != null) {
          if (response.data.state === "success") {
            this.setState({ estadospase: response.data.data });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {

    const handleChange = (event, newValue) => {
      this.setState({ valuetab: newValue });
    };

    const closeSnackCallBack = () => {
      this.setState({ snackshow: false });
    }

    const createUpdateCallBack = (data) => {
      this.getPasesSalidaUser();
      this.getPasesSalidaGrupo();

      if (data != null) {
        if (data.state != null) {
          if (data.state === "success") {
            console.log(data);
            this.setState({ snackshow: true, messagesnack: data.message, typesnack: "success" });
          } else {
            this.setState({ snackshow: true, messagesnack: data.message, typesnack: "error" });
          }
        }
      }
    }

    return (
      <div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={this.state.valuetab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Mis Solicitudes" {...a11yProps(0)} />
              <Tab className={!this.state.showtabjefe ? 'd-none' : ''} label="Aprobar Solicitudes" {...a11yProps(1)} />
              <Tab label="Historico" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={this.state.valuetab} index={0}>
            <PaseSalidaEmpleados
              usersession={this.state.usersession}
              solicitudesempleados={this.state.solicitudesempleados}
              tipopase={this.state.tipopase}
              estadospase={this.state.estadospase}
              onCreateUpdate={createUpdateCallBack} />
          </TabPanel>
          <TabPanel value={this.state.valuetab} index={1}>
            <PaseSalidaJefes
              usersession={this.state.usersession}
              solicitudesjefes={this.state.solicitudesjefes}
              tipopase={this.state.tipopase}
              estadospase={this.state.estadospase}
              onCreateUpdate={createUpdateCallBack} />
          </TabPanel>
          <TabPanel value={this.state.valuetab} index={2}>
            tab3
          </TabPanel>
        </Box>

        <SnackbarAlert
          message={this.state.messagesnack}
          show={this.state.snackshow}
          type={this.state.typesnack}
          onCloseSnack={closeSnackCallBack} />
      </div>
    );
  }
}

export default HomePasesSalida