let ioInstance;

export const initScoket = (io) =>{
    ioInstance = io;

    io.on('connection', (socket)=>{
        console.log('User connected',socket.id);
        socket.on('joinBoard', (boardId) =>{
            socket.join(boardId);
        });
        socket.on("taskUpdate", (data) =>{
            io.to(data.boardId).emit('taskUpdate', data.tasks);
        });
        socket.on('disconnect',()=>{
            console.log('user disconnected', socket.id);
        })
    })
}

export const getIo = () => ioInstance;