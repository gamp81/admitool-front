import * as React from 'react';
import banner from '../images/banner_registro.webp'

export default class WelcomeContent extends React.Component {

  render() {
    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h3>Bienvenidos</h3>
              {/*   <p className="lead">Login to see protected content.</p> */}
                <img src={banner} className="container " alt="logo" />
              </div>
            </div>
        </div>
    );
  };
}