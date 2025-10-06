import React ,{useState,useEffect}from "react";
import Column from "./Column";
import {DragDropContext} from 'react-beautiful-dnd';
import { socket } from "../socket";

export default function Board(){
    const [columns , setColumns] = useState([
    {id:'todo' , title:'Todo',taskIds:[]},
    {id:'in-progress' , title:'In Progress',taskIds:[]},
    {id:'done' , title:'Done',taskIds:[]}
]);

const [tasks,setTasks] = useState({
    todo:[],
    inprogress:[],
    done:[]
});

useEffect(()=>{
    socket.on('taskUpdate', (updateTasks)=>{
        setTasks(updateTasks);
    });

    return()=>{ socket.off('taskUpdate');
    }
},[]);

const onDragEnd = (result) =>{
    const {source,destination,draggableId} = result;
    if(!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceTasks = Array.from(tasks[sourceCol]);
    const [movedTask] = sourceTasks.splice(source.index,1);
    const destTasks = Array.from(tasks[destCol]);
    destTasks.splice(destination.index,0,movedTask);

    const newTasks = {
        ...tasks,
        [sourceCol]:sourceTasks,
        [destCol]:destTasks
    };
    setTasks(newTasks);
    socket.emit('moveTask',newTasks);
};

return (
    <DragDropContext onDragEnd = {onDragEnd}>
        <div style={{display:'flex', justifyContent:'flex-start' }}>
            {columns.map((col) =>(
                <Column key = {col.id} column={col} tasks = {tasks[col.id]} />
            ))}
        </div>
    </DragDropContext>
);

}