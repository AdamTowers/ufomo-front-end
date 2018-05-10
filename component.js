//game components class
function component (width, height, color, x, y, type){
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
    if (this.type === "text") {
      ctx = myGameArea.context
      ctx.font = this.width + " " + this.height
      ctx.fillStyle = color
      ctx.fillText(this.text, this.x, this.y)
    } else if (this.type === "image") {
      ctx = myGameArea.context
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
      ctx = myGameArea.context
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }//update method

  this.newPos = function() {
    if (this.x < 23) {
      this.x = 23
    }
    if (this.x > 345) {
      this.x = 345
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

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
           (mytop > otherbottom) ||
           (myright < otherleft) ||
           (myleft > otherright)) {
       crash = false;
    }
    return crash;
  }//crash method

}
