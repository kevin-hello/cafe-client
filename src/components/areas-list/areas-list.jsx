import React from 'react';
import { AreaCard } from '../area-card/area-card';

const AreasList = (props) => {
   console.log(props);     
        const mapped = props.map((obj, index) => obj.Area);
        const filtered = mapped.filter((type, index) =>  mapped.indexOf(type) === index  );

        console.log(filtered);

return ( 
<>

    {/* {props.cafes.map((cafe, index)=> <div key={cafe.Area.Name}>
          <AreaCard cafe={cafe}/>
        </div>)} */}
</>
)
}
export default AreasList;
