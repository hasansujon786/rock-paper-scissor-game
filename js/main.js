let setIn

new Vue({
  el: '#app',
  data() {
    return {
      images: ['paper', 'scissor', 'rock'],
      selector: 0,
      gameIsRunning: false,
      userChoice: '',
      compChoice: '',
      allowToTurn: true,
      clicked: false,
      scissor: '',
      rock: '',
      paper: '',
      compScore: 0,
      userScore: 0
    }
  },
  methods: {
    start() {
      if (this.allowToTurn) {
        setIn = setInterval(this.check, 100)
        this.userChoice = ''
        this.compChoice = ''
        this.allowToTurn = false
        this.clicked = false
        this.paper = ''
        this.rock = ''
        this.scissor = ''
      }
      this.gameIsRunning = true
    },
    check() {
      if (this.selector < 2) {
        this.selector++
      } else {
        this.selector = 0
      }
    },
    resetGame() {
      clearInterval(setIn)
      this.userScore = 0
      this.compScore = 0
      this.gameIsRunning = false
      this.allowToTurn = true
    },
    getUserChoice(choice) {
      if (!this.allowToTurn) {
        // comp choice selector
        this.selector = Math.floor(Math.random() * (2 - 0 + 1) + 0)
        this.userChoice = choice
        this.compChoice = this.images[this.selector]
        this.allowToTurn = true
        this.clicked = true
        clearInterval(setIn)

        if (choice == 'paper') {
          this.paper = 'paper'
        } else if (choice == 'scissor') {
          this.scissor = 'scissor'
        } else if (choice == 'rock') {
          this.rock = 'rock'
        }
      }
    }
  },
  computed: {
    result() {
      const vm = this
      if (this.gameIsRunning) {
        if (this.userChoice == '') {
          return 'Make your choice'
        } else if (this.compChoice == 'paper' && this.userChoice == 'rock') {
          vm.compScore++
          return 'User Lost, Computer Won'
        } else if (this.compChoice == 'paper' && this.userChoice == 'scissor') {
          vm.userScore++
          return 'User Won, Computer Lost'
        } else if (this.compChoice == 'rock' && this.userChoice == 'paper') {
          vm.userScore++
          return 'User Won, Computer Lost'
        } else if (this.compChoice == 'rock' && this.userChoice == 'scissor') {
          vm.compScore++
          return 'User Lost, Computer Won'
        } else if (this.compChoice == 'scissor' && this.userChoice == 'paper') {
          vm.compScore++
          return 'User Lost, Computer Won'
        } else if (this.compChoice == 'scissor' && this.userChoice == 'rock') {
          vm.userScore++
          return 'User Won, Computer Lost'
        } else {
          return 'Tie, no one won the game'
        }
      }
    }
  }
})
