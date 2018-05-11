let currentUser

//FUNCTIONS

//NEW USER FORM FUNCTION--------------
function newUserForm() {
  //fetch all users then create new user objects with those users
  fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(json => {
      for (let i = 0; i < json.length; i++) {
        new User(json[i])
      }
      return users
    })
    .then(usersArray => {
      //create login container
      let breakLine = document.createElement('br')
      const loginContainer = document.createElement('div')
      loginContainer.setAttribute('class', 'login-score-container')
      //create form
      const loginForm = document.createElement('form')
      //create logo img tag
      const logoImg = document.createElement('img')
      logoImg.setAttribute('src', 'images/UFOMO.png')
      loginForm.append(logoImg)
      //create form header
      const loginHeader = document.createElement('h4')
      loginHeader.innerText = 'LOGIN'
      loginForm.append(loginHeader)
      //create form selection box
      const userSelectionBox = document.createElement('select')
      userSelectionBox.innerHTML = "<option disabled selected></option>"
      users.forEach(user => {
        userSelectionBox.append(userFormOption(user))
      })
      //append selection box to form
      loginForm.append(userSelectionBox)
      //create create user header
      const createUserHeader = document.createElement('h4')
      createUserHeader.innerText = 'CREATE USER'
      loginForm.append(createUserHeader)
      //create new user text area
      const newUserText = document.createElement('input')
      newUserText.setAttribute('type', 'text')
      newUserText.setAttribute('placeholder', 'Username')
      loginForm.append(newUserText)
      // //break
      // loginForm.append(breakLine)
      //create form submit
      const submitLogin = document.createElement('button')
      // submitLogin.setAttribute('type', 'submit')
      submitLogin.innerText = "PLAY"
      submitLogin.addEventListener('click', (event) => {
        event.preventDefault()
        //find or create user
        if (userSelectionBox.value) {
          currentUser = users.find(user => {
            return user.name === userSelectionBox.value
          })
          showInstructions(loginContainer)
          window.setTimeout(function() {
            loginContainer.remove()
            startGame()
          }, 5000)
        } else if (newUserText.value) {
          fetch('http://localhost:3000/api/v1/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify({
                name: newUserText.value
              })
            })
            .then(res => res.json())
            // .then(json => new User(json))
            .then(json => new User(json))
            .then(newuser => {
              currentUser = newuser
              showInstructions(loginContainer)

              window.setTimeout(function() {
                loginContainer.remove()
                startGame()
              }, 5000)
            })
        }
      })
      loginForm.append(submitLogin)
      //append login form to container
      loginContainer.append(loginForm)
      //append container to body
      document.body.insertBefore(loginContainer, document.body.childNodes[0])
      //add event listener to submit button
    })
}

function showInstructions(loginContainer) {
  loginContainer.innerHTML = `
    <div class="g-screen-container">
      <h4>Greetings, ${currentUser.name}!</h4>
      <p>We know you want to hang out with a new human friend. However, it will take a while to beam him
        up to the ship.</p>
      <p>Use the ◀, ▶, ▲, ▼ keys to navigate him away from anything that might kill him!</p>
    </div>
  `
}

//game over screen --------------------
function gameOverScreen(currentScore) {
  //removes game canvas
  myGameArea.canvas.remove()


  //creates game over screen
  const gScreen = document.createElement('div')
  gScreen.setAttribute('class', 'login-score-container')

  //create div to center
  const gScreenContainer = document.createElement('div')
  gScreenContainer.setAttribute('class', 'g-screen-container')

  fetch('http://localhost:3000/api/v1/scores')
    .then(response => response.json())
    .then((json) => {
      for (const score of json) {
        new Score(score)
      }

      return scores
    })
    .then((scores) => {
      sortedScores = scores.sort(function(a, b) {
        return b.quantity - a.quantity
      })
      topFive = [sortedScores[0], sortedScores[1], sortedScores[2], sortedScores[3], sortedScores[4]]
      //creates game over title
      const gTitle = document.createElement('img')
      gTitle.setAttribute('class', 'dead-friend')
      gTitle.src = "images/your-friend-has-died.png"
      gScreenContainer.appendChild(gTitle)

      //creates restart game application
      const gAbduct = document.createElement('h4')
      gAbduct.innerText = "ABDUCT ANOTHER FRIEND?"
      gScreenContainer.appendChild(gAbduct)

      const gAbductButton = document.createElement('button')
      gAbductButton.innerText = "RESTART"
      gAbductButton.addEventListener('click', (event) => {
        event.preventDefault()
        location.reload()
      })
      gScreenContainer.appendChild(gAbductButton)

      //shows your score
      const gScore = document.createElement('h5')
      gScore.innerText = "YOUR SCORE"
      gScreenContainer.appendChild(gScore)

      const gScoreQuantity = document.createElement('h2')
      gScoreQuantity.setAttribute('class', 'your-score-quantity')
      gScoreQuantity.innerText = currentScore
      gScreenContainer.appendChild(gScoreQuantity)

      //shows top 5 scores
      const gHighScores = document.createElement('h5')
      gHighScores.innerHTML = "HIGH SCORES"
      gScreenContainer.appendChild(gHighScores)

      const gHSQ = document.createElement('div')
      for (const hs of topFive) {
        hsElement = document.createElement("p")
        hsElement.setAttribute('class', 'g-hsq')
        hsUser = users.find(function(user) {
          return user.id === hs.userId
        })
        hsElement.innerText = `${hsUser.name}: ` + `${hs.quantity}`
        gHSQ.appendChild(hsElement)
      }
      gScreenContainer.appendChild(gHSQ)

      gScreen.appendChild(gScreenContainer)

      //renders game over screen
      document.body.insertBefore(gScreen, document.body.childNodes[0])

    })

}
//-------------------------------------



//-------------------------------------

function userFormOption(user) {
  let optionElement = document.createElement('option')
  optionElement.setAttribute('id', `${user.id}`)
  optionElement.innerText = `${user.name}`
  return optionElement
}

function setCurrentUser(id) {
  fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(res => res.json())
    .then(json => currentUser = new User(json))
}

function startGame() {
  abductee = new Component(30, 60, "images/abductee.png", 185, 485, "image")
  score = new Component("16px", "courier", "cyan", 10, 20, "text")
  background = new Background(80, 600, "images/beam.png", 160, 0, "image")
  stars = new Background(400, 600, "images/stars.jpg", 0, 0, "image")

  scream = document.getElementById("scream")
  friend = document.getElementById("friend")
  friend.loop = true
  friend.play()

  myGameArea.start()

} //start game

const myObstacles = []

//new frames update function
function updateGameArea() {
  var y, width, gap, minWidth, maxWidth, minGap, maxGap
  for (var i = 0; i < myObstacles.length; i++) {
    if (abductee.crashWith(myObstacles[i])) {
      scream.play()
      myGameArea.gameOver()
      return
    } //game over crash
  }
  myGameArea.clear()
  //sets background image again
  myGameArea.frameNo += 1
  abductee.speedX = 0
  abductee.speedY = 0
  background.speedX = 0
  stars.update()

  //moves guy and changes image

  if (myGameArea.key && myGameArea.key === 37) {
    abductee.speedX = -5, background.speedX = -5, abductee.image.src = "images/abducteeLeft.png"
  }
  if (myGameArea.key && myGameArea.key === 38) {
    abductee.speedY = -5, abductee.image.src = "images/abducteeUp.png"
  }
  if (myGameArea.key && myGameArea.key === 39) {
    abductee.speedX = 5, background.speedX = 5, abductee.image.src = "images/abducteeRight.png"
  }
  if (myGameArea.key && myGameArea.key === 40) {
    abductee.speedY = 5, abductee.image.src = "images/abducteeDown.png"
  }

  //background methods
  background.newPos();
  background.update()

  //creates random obstacles
  const images = [
    "images/bluebird.png",
    "images/cardinal.png",
    "images/plane.png"
  ]

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

  if (myGameArea.frameNo == 1 || everyinterval(45)) {
    xAxisStart = randomElement([-100, 400])
    switch (randomElement(images)) {
      case "images/bluebird.png":
        if (xAxisStart === -100) {
          newObstacle = new Component(50, 35, "images/bluebird.png", -100, randomNumber(-50, 450), "image")
          newObstacle.speedX = randomDecimal(1.5, 3.5)
          myObstacles.push(newObstacle)
          break
        } else if (xAxisStart === 400) {
          newObstacle = new Component(50, 35, "images/dribeulb.png", 400, randomNumber(-50, 450), "image")
          newObstacle.speedX = randomDecimal(-3.5, -1.5)
          myObstacles.push(newObstacle)
          break
        }
      case "images/cardinal.png":
        if (xAxisStart === -100) {
          newObstacle = new Component(50, 35, "images/cardinal.png", -100, randomNumber(-50, 450), "image")
          newObstacle.speedX = randomDecimal(1.5, 3.5)
          myObstacles.push(newObstacle)
          break
        } else if (xAxisStart === 400) {
          newObstacle = new Component(50, 35, "images/lanidrac.png", 400, randomNumber(-50, 450), "image")
          newObstacle.speedX = randomDecimal(-3.5, -1.5)
          myObstacles.push(newObstacle)
          break
        }
      case "images/plane.png":
        if (xAxisStart === -100) {
          newObstacle = new Component(250, 100, "images/plane.png", -300, randomNumber(-50, 450), "image")
          newObstacle.speedX = randomDecimal(2.0, 2.5)
          myObstacles.push(newObstacle)
          break
        } else if (xAxisStart === 400) {
          newObstacle = new Component(250, 100, "images/enalp.png", 400, randomNumber(-50, 450), "image")
          newObstacle.speedX = randomDecimal(-2.5, -2.0)
          myObstacles.push(newObstacle)
          break
        }
        // default:
        //   code block
    }
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    switch (myObstacles[i].image.outerHTML) {
      case `<img src="images/bluebird.png">`:
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += randomDecimal(2.0, 2.5)
        myObstacles[i].update()
        break
      case `<img src="images/dribeulb.png">`:
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += randomDecimal(2.0, 2.5)
        myObstacles[i].update()
        break
      case `<img src="images/cardinal.png">`:
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += randomDecimal(2.0, 2.5)
        myObstacles[i].update()
        break
      case `<img src="images/lanidrac.png">`:
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += randomDecimal(2.0, 2.5)
        myObstacles[i].update()
        break
      case `<img src="images/plane.png">`:
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += 1
        myObstacles[i].update()
        break
      case `<img src="images/enalp.png">`:
        myObstacles[i].x += myObstacles[i].speedX
        myObstacles[i].y += 1
        myObstacles[i].update()
        break
    }
  }

  //score methods
  score.text = "SCORE: " + myGameArea.frameNo
  score.update()

  //guy methods
  abductee.newPos()
  abductee.update()

}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 === 0) {
    return true
  }
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
    window.addEventListener('keydown', function(e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function(e) {
      myGameArea.key = false;
    })
  }, //start

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }, //clear

  gameOver: function() {
    clearInterval(this.interval)
    fetch('http://localhost:3000/api/v1/scores', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          quantity: this.frameNo,
          user_id: currentUser.id
        })
      })
      .then(res => res.json())
      .then(
        gameOverScreen(this.frameNo)
      )


  } //game over

} //game area

//sound class
function sound(src) {
  this.sound = document.createElement("audio")
  this.sound.src = src
  this.sound.setAttribute("preload", "auto")
  this.sound.setAttribute("controls", "none")
  this.sound.style.display = "none"
  myGameArea.canvas.appendChild(this)
  this.play = function() {
    this.sound.play()
  }
  this.stop = function() {
    this.sound.pause()
  }
}
