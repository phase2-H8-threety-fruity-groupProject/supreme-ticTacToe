<template>
    <div class="mainpage"><br>
        <img class="mt-5" src="../assets/icon.png">  
        <h1>Let's Play Tic Tac Toe!</h1> <br> <br>
        <button @click.prevent="gameOn" class=" btn btn-lg btn-warning">I'm in!</button>
    </div>
</template>

<script>
export default {
    name: 'WelcomePage',
    methods: {
        gameOn () {
            this.$router.push({ name: 'Home'})
        } 
    }
}
</script>

<style>
.mainpage {
    text-align: center;
    background-color: blueviolet;
    height: 672px;
}
.mainpage img {
    width: 500px;
}
.mainpage h1 {
    font-size: 45px ;
    font-family: Arial, Helvetica, sans-serif;
    color: #ff9700;
}
.mainpage .btn {
    font-size: 30px;
    border: 1px solid blueviolet ;
    text-decoration: none;
    background-color: #ff9700;
    color: white;
    padding: 10px;
    border-radius: 7px;
    padding-left: 25px;
    padding-right: 25px;
}
.mainpage .btn:hover {
    color: black;
    cursor: pointer;
}
</style>