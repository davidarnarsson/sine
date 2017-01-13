import React from 'react' 

const Keys = ({keys, onTriggerKey}) => {
  return (
    <div className="keys">
      {keys.map((k, i) => <Key index={i} key={k.id} {...k} onTriggerKey={onTriggerKey} />)}  
    </div>   
  )
}

const Key = ({ id, index, name, onTriggerKey }) => {
  return (
    <div className="key" onMouseDown={e => {
      e.preventDefault();
      onTriggerKey(id, name, index)
    } }>
      <span className="key__name">{ name }  </span>
    </div>  
  )
}

export default Keys