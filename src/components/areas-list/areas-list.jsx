import React from 'react';
import { AreaCard } from '../area-card/area-card';

const AreasList = (props) => {
   var distinctAreas = Array.from(new Set(props));
return ( 
<>

    {distinctAreas.cafes.map((cafe, index)=> <div key={cafe.Area.Name}>
          <AreaCard cafe={cafe}/>
        </div>)}
</>
)
}
export default AreasList;
