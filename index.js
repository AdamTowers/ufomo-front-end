//FUNCTIONS

//NEW USER FORM FUNCTION--------------
// function newUserForm() {
//   //fetch all users then create new user objects with those users
//   fetch('http://localhost:3000/api/v1/users')
//   .then(res => res.json())
//   .then(json =>
//     {for (let i = 0; i < json.length; i++) {
//       new User(json[i])
//     } return users}
//   )
//   .then(usersArray => {
//     let loginContainer = document.createElement('div')
//     loginContainer.setAttribute('class', 'login-score-container')
//     document.body.insertBefore(loginContainer, document.body.childNodes[0])
//
//     //create form div
//     //create final score header
//     //create form
//     //create form dropdown with user instances
//     //create form text field
//     //if text field is not empty, create new user()
//     //after it submits it runs start game
//   })
// }
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
  abductee.speedY = 0

  //moves guy and changes image
  if (myGameArea.key && myGameArea.key == 37) {abductee.speedX = -5, abductee.image.src = "images/blueAbductee.gif"}
  if (myGameArea.key && myGameArea.key == 38) {abductee.speedY = -5}
  if (myGameArea.key && myGameArea.key == 39) {abductee.speedX = 5}
  if (myGameArea.key && myGameArea.key == 40) {abductee.speedY = 5}

  //creates random obstacles
  const images = ["images/flappy.png", "images/plane.png"]

  //rng
  function randomElement(array) {
    return array[Math.floor(Math.random() * images.length)]
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomDecimal(min, max) {
    return (Math.random() * (max - min + 1) + min)
  }

  if (myGameArea.frameNo == 1 || everyinterval(40)) {
    xAxisStart = randomElement([-100, 400])
    switch(randomElement(images)) {
      case "images/flappy.png":
        if (xAxisStart === -100) {
          newObstacle = new component(50, 50, "images/flappy.png", xAxisStart, randomNumber(-100, 200), "image")
          newObstacle.speedX = randomDecimal(2.5, 3.5)
          myObstacles.push(newObstacle)
          break
        } else if (xAxisStart === 400){
          newObstacle = new component(50, 50, "images/flappy.png", xAxisStart, randomNumber(-100, 200), "image")
          newObstacle.speedX = randomDecimal(-3.5, -2.5)
          myObstacles.push(newObstacle)
          break
        }
      case "images/plane.png":
        if (xAxisStart === -100) {
          newObstacle = new component(200, 50, "images/plane.png", xAxisStart, randomNumber(-50, 300), "image")
          newObstacle.speedX = randomDecimal(1.5, 2.5)
          myObstacles.push(newObstacle)
          break
        } else if (xAxisStart === 400){
          newObstacle = new component(200, 50, "images/plane.png", xAxisStart, randomNumber(-50, 250), "image")
          newObstacle.speedX = randomDecimal(-2.5, -1.5)
          myObstacles.push(newObstacle)
          break
        }
      // default:
      //   code block
    }
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    switch(myObstacles[i].image.src) {
      case "file:///Users/christiankim/Development/code/projects/ufomo/ufomo-front-end/images/flappy.png":
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += 3
        myObstacles[i].update()
        break
      case "file:///Users/christiankim/Development/code/projects/ufomo/ufomo-front-end/images/plane.png":
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += 1
        myObstacles[i].update()
        break
      // default:
      //   code block
    }
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
