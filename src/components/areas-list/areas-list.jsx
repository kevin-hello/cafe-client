import React from 'react';
import { AreaCard } from '../area-card/area-card';

const AreasList = (props) => {
        
return ( 
<>
    {props.cafes.map((cafe, index)=> <div key={cafe.Area.Name}>
          <AreaCard cafe={cafe}/>
        </div>)}
</>
)
}
export default AreasList;
