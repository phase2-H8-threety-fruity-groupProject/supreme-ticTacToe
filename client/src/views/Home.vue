<template>
  <div class="home playpage mt-5">
    <h1><b>Supreme Tic Tac Toe</b></h1>
    <h1>{{ submitedName }}</h1>
    <h1 v-if="activePlayer !== ''">Sekarang Giliran : {{ activePlayer }}</h1>
    <div v-if="submitedName == ''">
      <form @submit.prevent="submitPlayer" class="mt-3">
        <label for="username">Your name</label><br>
        <input
        id="username" 
        type="text"
        v-model="name"
        placeholder="type your name here..."
        autocomplete="off"
        >
        <input type="submit" value="send">
      </form><br>
    </div>
    <audio id="fightSound" src="../assets/audio/fight2.mp3"></audio>
    <audio id="clickSound" src="../assets/audio/button.mp3"></audio>
    <audio id="winSound" src="../assets/audio/applause2.mp3"></audio>
    <audio id="drawSound" src="../assets/audio/draw.mp3"></audio>
    <audio id="wrongSound" src="../assets/audio/wrong.mp3"></audio>
    <a v-if="activePlayer !== ''" @click.prevent="resetGame" > Reset </a>


    <!-- <Board /> -->
     <div  v-if="activePlayer !== ''" class="board" id="board">
        <div @click.prevent="clicktombol(1)" class="cell" data-cell id=1 > {{val1}} </div>
        <div @click.prevent="clicktombol(2)" class="cell" data-cell id=2 > {{val2}} </div>
        <div @click.prevent="clicktombol(3)" class="cell" data-cell id=3 > {{val3}} </div>
        <div @click.prevent="clicktombol(4)" class="cell" data-cell id=4 > {{val4}} </div>
        <div @click.prevent="clicktombol(5)" class="cell" data-cell id=5 > {{val5}} </div>
        <div @click.prevent="clicktombol(6)" class="cell" data-cell id=6 > {{val6}} </div>
        <div @click.prevent="clicktombol(7)" class="cell" data-cell id=7 > {{val7}} </div>
        <div @click.prevent="clicktombol(8)" class="cell" data-cell id=8 > {{val8}} </div>
        <div @click.prevent="clicktombol(9)" class="cell" data-cell id=9 > {{val9}} </div>
    </div>

    
    <p v-for="(msg, i) in messages" :key="i">
      {{ msg.name }} : {{ msg.message }}
    </p>

  </div>
</template>

<script>
import Board from '../components/Board'
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      submitedName: '',
      activePlayer: '',
      counterStep:0, 
      val1: '', 
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      val6: '',
      val7: '',
      val8: '',
      val9: '',
      isWin: false 
    }   
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }    
  },
  sockets: {
    init (payload) {
      this.$store.commit('setMessages', payload )
    },
    resetMessage (payload) {
      this.val1 = payload.val1
      this.val2 = payload.val2
      this.val3 = payload.val3
      this.val4 = payload.val4
      this.val5 = payload.val5
      this.val6 = payload.val6
      this.val7 = payload.val7
      this.val8 = payload.val8
      this.val9 = payload.val9
      this.counterStep = payload.counterStep
      this.activePlayer = payload.activePlayer
      this.isWin = payload.isWin
      this.name= ''
      this.submitedName= ''
      this.activePlayer= ''
      //console.log ( payload.adminMessage)
      
      this.$store.commit('resetMessages' )
      this.$store.commit('setMessages', payload.adminMessage)
    },
    serverMessage (payload) {
      //console.log(payload,'ini payload dari server message')
      this.val1 = payload.val1
      this.val2 = payload.val2
      this.val3 = payload.val3
      this.val4 = payload.val4
      this.val5 = payload.val5
      this.val6 = payload.val6
      this.val7 = payload.val7
      this.val8 = payload.val8
      this.val9 = payload.val9
      this.counterStep = payload.counterStep
      this.activePlayer = payload.activePlayer
      this.isWin = payload.isWin
    },
    adminMessage (payload) {
      this.activePlayer = payload.activePlayer
      if (payload.activePlayer){ 
        document.getElementById('fightSound').play()
      }
      this.$store.commit('setMessages', payload)
    },
    winnerMessage (payload) {
      if (this.submitedName === payload.win) {
        this.$swal('Congratulation You Win !!');
        document.getElementById('winSound').play()
      } else {
        if (this.submitedName === payload.lose) {
          this.$swal('You Lose !!');
        }
      }
    },
    drawMessage(){
      this.$swal('Tied !!');
      document.getElementById('drawSound').play()
    }
  },
  methods: {
    resetGame(){
      this.$socket.emit('resetGame')
    },
    sendMessage () {
      this.$socket.emit('newMessages', { message: this.message, name: this.name })
      this.messages.push({ message: this.message, name: this.name })
      this.message = ''
    },
    submitPlayer () {
      this.submitedName = this.name
      this.$socket.emit('submitPlayer', { name: this.name })
    },
    clicktombol (id) {
            if (this.activePlayer === this.submitedName && this.isWin === false)
            {
              let turn = ''
              let flag = false
              if(this.counterStep %2 === 0 && turn === ''){
                  turn = this.activePlayer[0]
              } else {
                  turn = this.activePlayer[0]
              } 
              if(id === 1 && this.val1 === ''){
                  this.val1 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 2 && this.val2 === ''){
                  this.val2 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 3 && this.val3 === ''){
                  this.val3 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 4 && this.val4 === ''){
                  this.val4 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 5 && this.val5 === ''){
                  this.val5 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 6 && this.val6 === ''){
                  this.val6 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 7 && this.val7 === ''){
                  this.val7 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 8 && this.val8 === ''){
                  this.val8 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              } else if(id === 9 && this.val9 === ''){
                  this.val9 = turn
                  flag = true
                  this.counterStep++;
                  this.winCheck()
              }
              // document.getElementById(id).style.pointerEvents = 'none' 
              // this.winCheck()
              console.log(this.counterStep)
              if(flag === true) {
                document.getElementById('clickSound').play()
                this.$socket.emit('newMessages', {
                    val1: this.val1, 
                    val2: this.val2,
                    val3: this.val3,
                    val4: this.val4,
                    val5: this.val5,
                    val6: this.val6,
                    val7: this.val7,
                    val8: this.val8,
                    val9: this.val9,
                    counterStep: this.counterStep,
                    isWin: this.isWin
                  }) 
              }
            } else {
              if (this.isWin === true) {
                this.$swal('Game Finished,\n please reset to play again');
                document.getElementById('wrongSound').play()
              } else {
                this.$swal('This is not your turn !!');
                document.getElementById('wrongSound').play()
              }
              
            }
        },
    winCheck() {
      if(this.val1 === this.activePlayer[0] && this.val2 === this.activePlayer[0] && this.val3 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val4 === this.activePlayer[0] && this.val5 === this.activePlayer[0] && this.val6 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val7 === this.activePlayer[0] && this.val8 === this.activePlayer[0] && this.val9 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val1 === this.activePlayer[0] && this.val4 === this.activePlayer[0] && this.val7 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val2 === this.activePlayer[0] && this.val5 === this.activePlayer[0] && this.val8 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val3 === this.activePlayer[0] && this.val6 === this.activePlayer[0] && this.val9 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val1 === this.activePlayer[0] && this.val5 === this.activePlayer[0] && this.val9 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.val3 === this.activePlayer[0] && this.val5 === this.activePlayer[0] && this.val7 === this.activePlayer[0]) {
        console.log(this.activePlayer + 'win')
        this.isWin = true
      } else if(this.counterStep === 9) {
        console.log('draw')
        this.$socket.emit('draw')
      }

      if(this.isWin === true){
        this.$socket.emit('winner', { winner: this.activePlayer })
      }
      
    } 
  },
  created () {
    
  },
  components: {
    Board
  }
}
</script>

<style>
.playpage {
    text-align: center;
    background-color: blueviolet;
    height: 680px;
}
.board {
    display: grid;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, auto)
  }
  
  .cell {
    width: 120px;
    height: 120px;
    border: 2px solid black;
    background-color: white;
    display: flex;
    position: relative;
    cursor: pointer;
    font-size: 90px;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .cell:hover{
      border: 2px solid #ff9700;
  }
  .playpage h1 {
    font-size: 45px ;
    font-family: Arial, Helvetica, sans-serif;
    color:  #ff9700;
  }
  .playpage label {
    color: white;
  }
  .playpage p {
    color: white;
  }
  .playpage a {
    cursor: pointer;
    color: white;
    font-size: 16px;
  }
</style>
