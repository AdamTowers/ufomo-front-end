//FUNCTIONS

//NEW USER FORM FUNCTION--------------
function newUserForm() {
  //fetch all users then create new user objects with those users
  fetch('')
  //create form div
  //create final score header
  //create form
  //create form dropdown with user instances
  //create form text field
  //if text field is not empty, create new user()
  //after it submits it runs start game
}
//-------------------------------------

function startGame() {
  abductee = new component(60, 60, "images/abducteeBig.gif", 185, 485, "image")
  score = new component("16px", "Consolas", "white", 10, 590, "text")

  myGameArea.start()
}//start game

const myObstacles = []

//new frames update function
function updateGameArea() {
  var y, width, gap, minWidth, maxWidth, minGap, maxGap
  for (var i = 0; i < myObstacles.length; i++) {
    if (abductee.crashWith(myObstacles[i])) {
      myGameArea.gameOver()
      return
    }//game over crash
  }
  myGameArea.clear()
  myGameArea.frameNo += 1
  abductee.speedX = 0

  //moves guy and changes image
  if (myGameArea.key && myGameArea.key == 37) {abductee.speedX = -5, abductee.image.src = "images/blueAbductee.gif"}
  if (myGameArea.key && myGameArea.key == 39) {abductee.speedX = 5}

  //creates random obstacles
  if (myGameArea.frameNo == 1 || everyinterval(75)) {
    x = myGameArea.canvas.width
    minWidth = 300
    maxWidth = 100
    width = randomNumber(minWidth, maxWidth)
    xAxisStart = randomNumber(0, 150)
    myObstacles.push(new component(x - width, 10, "green", xAxisStart, -50));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += 2;
    myObstacles[i].update();
  }

  //score methods
  score.text="SCORE: " + myGameArea.frameNo
  score.update()

  //guy methods
  abductee.newPos()
  abductee.update()

}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 === 0) {return true}
  return false
}

//rng
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}






//OBJECT DEFINITIONS
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 400;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20)
    window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
    })
  },//start

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },//clear

  gameOver: function() {
    clearInterval(this.interval)
    //let newScore = new score(this.frameNo, selected_user.id)
    //fetch create newScore

  }//game over

}//game area



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
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > 340) {
      this.x = 340
    }
    this.x += this.speedX
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

//sound class
function sound(src) {
  this.sound = document.createElement("audio")
  this.sound.src = src
  this.sound.setAttribute("preload", "auto")
  this.sound.setAttribute("controls", "none")
  this.sound.style.display = "none"
  document.body.appendChild(this)
  this.play = function() {
    this.sound.play()
  }
  this.stop = function() {
    this.sound.pause()
  }
}
