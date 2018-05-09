let users = []

class User {
  constructor(user) {
    this.id = user.id
    this.name = user.name

    users.push(this)
  }
}
