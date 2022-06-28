import React from 'react';
import { AreaCard } from '../area-card/area-card';

function AreasList(cafes) {

  const uniqueAreaNames = [];

  const uniqueAreas = cafes.filter(cafe => {
    const isDuplicate = uniqueAreaNames.includes(cafe.Area.Name);

    if(!isDuplicate) {
      uniqueAreaNames.push(cafe.Area.Name);

      return true;
    }

    return false
  });

return ( <>
    {uniqueAreas.map(cafe => {
      return (
        <div key={cafe.Area.Name}>
          <AreaCard cafe={cafe}/>
        </div>
      )
    })}
</>
)
}
export default AreasList;
