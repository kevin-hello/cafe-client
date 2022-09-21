import React from 'react';
import {MdLocalCafe} from 'react-icons/md';
import './area-marker.scss';

const AreaMarker = ({cafeName , $hover}) => {
  
    return (
      <div className={$hover ? "hover" : "none"}>
        <MdLocalCafe size="2rem" className='cafe-icon' />
        <div className='area-cafe-name'>{cafeName}</div>
      </div>
    );
  };

  export default AreaMarker;
