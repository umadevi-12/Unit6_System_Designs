import React from "react";
import {Droppable} from 'react-beautiful-dnd';
import Task from './Task';

 export default function Column({column,tasks,isDropDisabled = false}){
    return(
        <div className="column-container" style={{margin:'10px', width:'300px', background:'rgba(10,12,126,0.93)', borderRadius:'5px', padding:'10px'}}>
            <h2>{column.title}</h2>
            <Droppable droppableId = {column.id} isDropDisabled = {isDropDisabled}>
                {(provided,snapshot)=>(
                    <div
                     ref = {provided.innerRef} 
                     {...provided.droppableProps}
                     className={`droppable-area ${
                        snapshot.isDraggingOver ? 'dragging-over':''}`}>
                    

                        {tasks.map((task,index) =>(
                            <Task key = {task.id} task = {task} index = {index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

