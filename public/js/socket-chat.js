const socket = io()

const params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
	window.location = 'index.html'
	throw new Error('name and room required')
}

const user = {
	name: params.get('name').toUpperCase(),
	room: params.get('room').toUpperCase()
}

socket.on('connect', () => {
	socket.emit('enterChat', user, (res) => {
		console.log('connected users:', res)
		if(res?.error) {
			alert(res.message)
			window.location = 'index.html'
		}
	})
})

socket.on('disconnect', () => {
	console.log('Perdimos conexión con el servidor')
})

socket.on('createMessage', (message) => {
	console.log(message)
})

socket.on('userList', (users) => {
	console.log(users)
})

socket.on('privateMessage', (data) => {
	console.log(data)
})