import React from "react";

import {Draggable} from 'react-beautiful-dnd';

export default function Task({task,index}){
    return(
        <Draggable draggableId={task.id} index= {index}>
            {(provided)=>(
                <div 
                ref = {provided.innerRef}
                {...provided.draggableProps}
                {...provided.draggableHandleProps}
                style={{
                    padding:'10px',
                    margin:'5px 0',
                    background:'white',
                    backgroundRedius:'5px',
                    boxShadow:'0 1px 3px  rgba(0,0,0,0.2',
                    ...provided.draggableProps.style
                }}
                >
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <small>Assigned to: {task.assignedTo}</small><br/>
                    <small>Due :{task.dueDate}</small>
                </div>
            )}
            </Draggable>
    );
}