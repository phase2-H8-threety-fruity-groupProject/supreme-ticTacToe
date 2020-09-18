<template>
    <div class="board" id="board">
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
</template>

<script>
export default {
    name: 'Board', 
    data () { 
        return { 
            counterStep:0, 
            val1: '', 
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            val6: '',
            val7: '',
            val8: '',
            val9: '' 
        } 
    },
    sockets: {
        serverMessage (payload) {
            let newMessages = [...this.messages, payload]
            console.log(payload,'ini payload dari server message')
            this.$store.commit('setMessages', newMessages)
        }
    },
    methods: {    
        clicktombol (id) {
            this.counterStep++;
            let turn = ''
            if(this.counterStep %2 === 0 && turn === ''){
                turn = 'x'
            } else {
                turn = 'o'
            } 
            if(id === 1){
                this.val1 = turn
            } else if(id === 2){
                this.val2 = turn
            } else if(id === 3){
                this.val3 = turn
            } else if(id === 4){
                this.val4 = turn
            } else if(id === 5){
                this.val5 = turn
            } else if(id === 6){
                this.val6 = turn
            } else if(id === 7){
                this.val7 = turn
            } else if(id === 8){
                this.val8 = turn
            } else if(id === 9){
                this.val9 = turn
            }
            document.getElementById(id).style.pointerEvents = 'none' 
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
                 counterStep: this.counterStep
            }) 
        } 
    } 
}
</script>

<style>
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
</style>