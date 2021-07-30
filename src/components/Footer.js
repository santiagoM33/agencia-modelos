import React from 'react';
//import FooterMedia from './components/FooterMedia';

const Footer = () => {
    return (       
    <footer className="bd-footer text-muted">
      <div className="container-fluid p-3 p-md-5 bg-secondary text-light">
        <div className='row'>
          <div className='col-12'>
          <p>Currently v4.6.0. Code licensed <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE" target="_blank" rel="noreferrer">MIT</a>, docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a>.</p>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 bg-dark'>
            <p className='text-center'>Todos los derechos reservados &copy;</p>
          </div>
        </div>
      </div>
    </footer>
     );
}
 
export default Footer;