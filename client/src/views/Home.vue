<template>
  <div class="home">
    <h1>Testing socket io</h1>
    <h1>{{ submitedName }}</h1>
    <h1 v-if="activePlayer !== ''">Sekarang Giliran : {{ activePlayer }}</h1>
    <div v-if="submitedName == ''">
      <form @submit.prevent="submitPlayer">
        <label for="username">Username</label>
        <input
        id="username" 
        type="text"
        v-model="name"
        placeholder="type your name here..."
        autocomplete="off"
        >
        <input type="submit" value="send">
      </form>
    </div>


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

        <div>
            <button @click="turnOnMusic()"></button>
        </div>
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
      this.$store.commit('setMessages', payload)
    }
  },
  methods: {
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
