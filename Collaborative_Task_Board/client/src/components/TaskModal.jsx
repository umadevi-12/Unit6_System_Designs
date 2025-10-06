import React, { useState } from "react";

export default function TaskModal({isOpen , onClose , onSave}){
    const [title,setTitle] = useState('');
    const[description , setDescription] = useState('');
    const[assignedTo , setAssignedTo] = useState('');
    const[dueDate , setDuoDate] = useState('');

    if(!isOpen) return null;

    const hanldeSubmit = (e) =>{
        e.preventDefault();
        onSave({title , description , assignedTo,dueDate});
        onClose();
    };

    return(
        <div style={{position:'fixed', top:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <form onSubmit={hanldeSubmit} style={{background:'white', padding:'20px', borderRadius:'5px'}}>
                <h3>Create Task</h3>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input placeholder="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
                <input placeholder="Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <button type="submit">save</button>
                <button type='button' onClick={onClose} style={{marginLeft:'10px'}}>Cancel</button>
            </form>
        </div>
    )
}