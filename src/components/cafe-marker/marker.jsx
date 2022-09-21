import React from 'react';
import {MdLocalCafe} from 'react-icons/md';
import './marker.scss';

const Marker = ({cafeName , $hover}) => {
  
    return (
      <div className={$hover ? "hover" : "none"}>
        <MdLocalCafe size="2rem" className='cafe-icon' />
        <div className='cafe-name-div'>{cafeName}</div>
      </div>
    );
  };

  export default Marker;