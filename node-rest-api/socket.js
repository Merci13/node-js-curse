let io;

module.export = {
    init: httpServe => {
        io = require('socket.io')(httpServe);
        return io;
    },
    getIO: () => {
        if(!io){
            throw new Error('Socket.io not initialized!');

        }
        return io;
    }
};