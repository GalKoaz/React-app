import React from 'react'

export default function Item(props) {
  return (
    <li key={props.id} id={props.id} onClick={()=>{
        props.onChecked(props.id);
    }}>{props.item}</li>
  );
}