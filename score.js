let scores = []

class Score {
  constructor(quantity, user_id) {
    this.quantity = quantity
    this.userId = user_id

    scores.push(this)
  }
}
