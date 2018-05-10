function background (width, height, color, x, y, type){
  this.type = type
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width
  this.height = height
  this.x = x
  this.y = y
  this.speedX = 0
  this.speedY = 0
  this.update = function() {
    if (this.type === "image") {
      ctx = myGameArea.context
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
      ctx = myGameArea.context
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }//update method

  this.newPos = function() {
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > 320) {
      this.x = 320
    }
    if (this.y < 0) {
      this.y = 0
    }
    if (this.y > 540) {
      this.y = 540
    }
    this.x += this.speedX
    this.y += this.speedY
  }//new position method
}
