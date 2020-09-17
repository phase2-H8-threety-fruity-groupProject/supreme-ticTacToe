<template>
  <div class="home">
    <h1>Testing socket io</h1>
    <form @submit.prevent="sendMessage">
      <label for="username">Your Name</label>
      <input
      id="username" 
      type="text"
      v-model="name"
      placeholder="type your name here..."
      autocomplete="off"
      >
      <input 
      type="text"
      v-model="message"
      placeholder="type here..."
      autocomplete="off"
      >
      <input type="submit" value="send">
    </form>

    <p v-for="(msg, i) in messages" :key="i">
      {{ msg.name }} : {{ msg.message }}
    </p>

    <Board />
  </div>
</template>

<script>
import Board from '../components/Board'
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      message: ''
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
      let newMessages = [...this.messages, payload]
      this.$store.commit('setMessages', newMessages)
    }
  },
  methods: {
    sendMessage () {
      this.$socket.emit('newMessages', { message: this.message, name: this.name })
      this.messages.push({ message: this.message, name: this.name })
      this.message = ''
    }
  },
  created () {
    
  },
  components: {
    Board
  }
}
</script>
