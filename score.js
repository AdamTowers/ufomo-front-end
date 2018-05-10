let scores = []

class Score {
  constructor(data) {
    this.quantity = data.quantity
    this.userId = data.user_id

    scores.push(this)
  }
}
