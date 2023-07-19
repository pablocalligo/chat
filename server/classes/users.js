class Users {
  constructor() {
    this.persons = []
  }

  addPerson(id, name, room) {
    const person = { id, name, room }
    this.persons.push(person)
    return this.getPersonsByRoom(room)
  }

  removePerson(id) {
    const person = this.getPerson(id)
    this.persons = this.persons.filter(p => p.id !== id)
    return person
  }

  getPerson(id) {
    return this.persons.find(p => p.id === id)
  }

  getPersonByName(name) {
    return this.persons.find(p => p.name === name)
  }

  getPersons() {
    return this.persons
  }

  getPersonsByRoom(room) {
    return this.persons.filter(p => p.room === room)
  }

}

module.exports = {
  Users
}