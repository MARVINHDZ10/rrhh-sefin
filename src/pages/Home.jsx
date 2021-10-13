import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListMenu from '../components/ListMenu';
import '../css/Home.css'
import NavbarMovil from '../components/NavbarMovil';
import { Switch, Route } from 'react-router-dom';
import { ButtonCustomized } from '../components/Button';
import { Input } from '../components/Input';
import PasesSalida from './PaseSalida/HomePasesSalida';
import PaseSalidaService from "../services/PaseSalidaService";
import store from '../store';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      usersession: '',
      notificaciones: 0,
      tareasEmpleados: [],
      tareasJefes: []
    };

    store.subscribe(() => {
      this.setState({ usersession: store.getState().userReducer[0] });
      this.props.roles &&
        this.props.roles.map((item, index) =>
          item.includes("jefesUDEM") ? this.getPasesSalidaGrupo() : ""
        );

      this.props.roles &&
        this.props.roles.map((item, index) =>
          item.includes("empleadosUDEM") ? this.getPasesSalidaUser() : ""
        );
    });

    this.setState = this.setState.bind(this);
  }

  getPasesSalidaGrupo() {
    PaseSalidaService.getPasesSalidaGrupoList()
      .then((response) => {
        if (response.data != null) {
          if (response.state === "success") {
            let total = this.state.notificaciones + response.data.task_summary.length;
            this.setState({ notificaciones: total, tareasJefes: response.data.task_summary });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getPasesSalidaUser() {
    console.log(this.state.usersession.usuario_sso);
    PaseSalidaService.getPasesSalidaUserList(this.state.usersession.usuario_sso)
      .then((response) => {
        if (response.data != null) {
          if (response.state === "success") {
            let total = this.state.notificaciones + response.data.task_summary.length;
            this.setState({ notificaciones: total, tareasEmpleados: response.data.task_summary });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let menuStyle = {};
    let containerStyle = {};

    if (this.state.showMenu === true) {
      menuStyle = {
        display: 'block'
      };
      containerStyle = {
        display: 'none'
      };
    }

    const saludo = (event) => {
      alert("Hola Mundo");
    };

    return (
      <div className='div_principal'>
        {this.state.usersession ? (
          <div>
            <Navbar keycloak={this.props.keycloak} state={this.state} roles={this.props.roles} />
            <div>
              <div className='col-2 menu_list' style={menuStyle}>
                <ListMenu state={this.state} setState={this.setState} />
              </div>
              <div className="col-10 container_div" style={containerStyle}>
                <p className='p_bienvenida'>Bienvenido {this.state.usersession.usuario_sso} al sistema de integracion integrada</p>
                <div className='contenedor'>
                  <Switch>
                    <Route path="/" exact>
                      Inicio
                    </Route>
                    <Route path="/pasesalida" exact>
                      <PasesSalida
                        usersession={this.state.usersession}
                        roles={this.props.roles} />
                    </Route>
                    <Route path="/sami">
                      SAMI
                    </Route>
                    <Route path="/siret">
                      SIRET
                    </Route>
                    <Route path="/siarh">
                      SIARH
                    </Route>
                    <Route path="/sniph">
                      SNIPH
                    </Route>
                    <Route path="/sicit">
                      SICIT
                    </Route>
                    <Route path="/proyectos">
                      Proyectos
                    </Route>
                    <Route path="/configuracion">
                      <Input textLabel='Usuario'
                        placeHolder='Ingresa tu usuario'
                        widthLabel='3'
                        widthInput='9' />
                      <ButtonCustomized className='btns'
                        buttonColor='primary'
                        buttonSize='medium'
                        onClick={(event) => saludo(event)}>Inicio</ButtonCustomized>
                    </Route>
                    <Route path="/**">
                      aqui
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
            <Footer />
            <NavbarMovil state={this.state} setState={this.setState} />
          </div>
        ) : (
          <div>
          </div>)}
      </div>
    );
  }
}

export default Home;