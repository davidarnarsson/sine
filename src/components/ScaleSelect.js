import React from 'react'


const ScaleSelect = ({ scales, onScaleSelect }) => {

  return (
    <select className="select-scale" onChange={_ => onScaleSelect(scales.find(x => x.name === _.target.value))}>
      {scales.map(x => <option key={x.name} value={x.name}>{x.name}</option>)}  
    </select>  
  )
}

export default ScaleSelect