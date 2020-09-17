<template>
    <div class="board" id="board">
        <div class="cell" data-cell id="cell1" onclick="clicktombol(1)"></div>
        <div class="cell" data-cell id="cell2" onclick="clicktombol(2)"></div>
        <div class="cell" data-cell id="cell3" onclick="clicktombol(3)"></div>
        <div class="cell" data-cell id="cell4" onclick="clicktombol(4)"></div>
        <div class="cell" data-cell id="cell5" onclick="clicktombol(5)"></div>
        <div class="cell" data-cell id="cell6" onclick="clicktombol(6)"></div>
        <div class="cell" data-cell id="cell7" onclick="clicktombol(7)"></div>
        <div class="cell" data-cell id="cell8" onclick="clicktombol(8)"></div>
        <div class="cell" data-cell id="cell9" onclick="clicktombol(9)"></div>
    </div>
</template>

<script>
export default {

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