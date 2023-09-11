import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Item.css'

export default function Item(props) {
  return (
    <div className="todo-item">
    <li key={props.id} id={props.id}>{props.item}<DeleteIcon className="delete-icon" onClick={()=>{
        props.onChecked(props.id);}}/> <EditIcon className='edit-icon' onClick={()=>{
            props.onChecked2(props.id);
        }}/></li>
    </div>
  );
}