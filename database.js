let users = [
	{ id: "1", name: "Gandalf", bio: "The best wizard ever, he arrives precisely when he means to!" },
	{ id: "2", name: "Samwise Gamgee", bio: "PO-TAY-TOES, the real MVP of The Lord of the Rings" },
	{ id: "3", name: "Legolas Greenleaf", bio: "Slinging arrows since the beginning of the third age" },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}