import React from 'react';
import Toggler from './ToggleSwitch'
const Footer = (props)=>{

  return (
      <>
        <footer style={{backgroundColor:'#fcba03', marginTop:'10px'}}>
          <label style={{fontSize:'1.0rem', marginLeft:'30%', color:'black'}}>
            Switch CMS{<span> &nbsp; </span>}</label>
            <Toggler />
            <label style={{fontSize:'1.0rem', marginLeft:'20%', color:'black'}}>
            #Events:{props.events}</label>
        </footer>
      </>
  );
}

export default Footer
