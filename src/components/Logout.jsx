import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import CookieService from '../http/CookieService';

class Logout extends Component {

  logout() {
    CookieService.deleteCookies();
    this.props.history.push('/');
    this.props.keycloak.logout();
  }

  render() {
    return (
      <button onClick={ () => this.logout() }>
        Logout
      </button>
    );
  }
}

export default withRouter(Logout);