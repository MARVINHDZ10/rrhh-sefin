import React from 'react';
import '../css/Footer.css';

function Footer(props) {
  return (
      <div className="footer">
        <img height='50' width='200' alt='img' className='img_footer' src={`${process.env.PUBLIC_URL}/assets/images/footer_img.png`} />          
        <a className="a_footer" href='/#'>2021 - Secretaria de Finanzas, Honduras</a>
      </div>    
  );
}

export default Footer;