const { io } = require('../server')
const { Users } = require('../classes/users')
const { createMessage } = require('../utils/utils')

const users = new Users()

io.on('connection', (client) => {
	client.on('enterChat', (user, callback) => {
		if(!user.name || !user.room) {
			return callback({
				error: true,
				message: 'name and room required'
			})
		}

		if(users.getPersonByName(user.name)) {
			return callback({
				error: true,
				message: 'name already exist'
			})
		}

		client.join(user.room)
		const onlineUsers = users.addPerson(client.id, user.name, user.room)
		client.broadcast.to(user.room).emit('userList', users.getPersonsByRoom(user.room))
		return callback(onlineUsers)
	})
	
	client.on('disconnect', () => {
		const user = users.removePerson(client.id)
		client.broadcast.to(user?.room).emit('createMessage', createMessage('Admin', user?.name + ' left.'))
		client.broadcast.to(user?.room).emit('userList', users.getPersonsByRoom(user?.room))
	})

	client.on('createMessage', (message) => {
		const user = users.getPerson(client.id)
		client.broadcast.to(user.room).emit('createMessage', createMessage(user.name, message))
	})

	client.on('privateMessage', (data) => {
		const user = users.getPerson(client.id)
		client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message))
	})
})
