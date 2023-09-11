import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './Item.css'

export default function Item(props) {
  return (
    <div className="todo-item">
    <li key={props.id} id={props.id}>{props.item}<DeleteIcon className="delete-icon" onClick={()=>{
        props.onChecked(props.id);
    }}/></li>
    </div>
  );
}