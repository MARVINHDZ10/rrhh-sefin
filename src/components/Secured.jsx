import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import Home from '../pages/Home';
import { saveUserSession, } from "../actions/LoginSSO";
import EmpleadosService from "../services/EmpleadosService";
import store from "../store";
import CookieService from "../http/CookieService"

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
      roles: []
    };

    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then(authenticated => {
      CookieService.saveToken(keycloak.token);
      keycloak.loadUserInfo().then(userInfo => {        
        EmpleadosService.getInfoEmpleado(userInfo.preferred_username)
          .then((response) => {
            if (response.data.state != null) {
              if (response.data.state === "success") {
                store.dispatch(saveUserSession(response.data.data));
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });

      this.setState({ keycloak: keycloak, authenticated: authenticated, roles: keycloak.realmAccess.roles })
    })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <Home
          keycloak={this.state.keycloak}
          roles={this.state.roles} />
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}

export default Secured;