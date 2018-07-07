function onCellClick(btnObj) {
    // elem.innerText = elem.value;
    var elemValue = btnObj.value;
    var row = elemValue.substr(0, 1);
    var column = elemValue.substr(1, 2);

    var player = board.markCell(row, column);
    if (player !== null) {
        btnObj.innerText = player.getName();
        if (board.winner !== null) {
            printWinner("Winner: " + board.winner.getName());
        }else if(board.step === 9){
            printWinner("Nicha")
        }
    }
}

function printWinner(message) {
    document.getElementById("result").style.visibility = "visible";
    document.getElementById("winner").innerText = message;
}

class Player {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}

class Cell {
    constructor() {
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }
}

class Board {
    constructor() {
        this.restart();
    }

    initCells(emptyCells) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                emptyCells[i][j] = new Cell();
            }
        }
    }

    markCell(row, column) {
        var resultPlayer = null;
        if (this.isValidCell(row, column)) {
            this.step++;
            resultPlayer = new Player(this.currentPlayer.getName());
            this.cells[row][column].setPlayer(resultPlayer);
            if (this.checkWinner(this.currentPlayer, row, column)) {
                this.running = false;
                this.winner = resultPlayer;
            } else {
                this.switchCurrentPlayer();
            }
        }
        return resultPlayer;
    }

    isValidCell(row, column) {
        var isValid = false;
        if (this.running) {
            if (this.cells[row][column].getPlayer() === undefined) {
                isValid = true;
            }
        }
        return isValid;
    }

    switchCurrentPlayer() {
        if (this.currentPlayer.getName() === "X") {
            this.currentPlayer.setName("O");
        } else {
            this.currentPlayer.setName("X");
        }
    }

    checkWinner(player, row, column) {
        var hasWinner = false;
        if (
            this.cells[row][0].getPlayer() !== undefined
            && this.cells[row][0].getPlayer().getName() === player.getName()
            && this.cells[row][1].getPlayer() !== undefined
            && this.cells[row][1].getPlayer().getName() === player.getName()
            && this.cells[row][2].getPlayer() !== undefined
            && this.cells[row][2].getPlayer().getName() === player.getName()) {
            hasWinner = true;
        } else if (
            this.cells[0][column].getPlayer() !== undefined
            && this.cells[0][column].getPlayer().getName() === player.getName()
            && this.cells[1][column].getPlayer() !== undefined
            && this.cells[1][column].getPlayer().getName() === player.getName()
            && this.cells[2][column].getPlayer() !== undefined
            && this.cells[2][column].getPlayer().getName() === player.getName()) {
            hasWinner = true;
        } else if (
            this.cells[0][0].getPlayer() !== undefined
            && this.cells[0][0].getPlayer().getName() === player.getName()
            && this.cells[1][1].getPlayer() !== undefined
            && this.cells[1][1].getPlayer().getName() === player.getName()
            && this.cells[2][2].getPlayer() !== undefined
            && this.cells[2][2].getPlayer().getName() === player.getName()) {
            hasWinner = true;
        } else if (
            this.cells[0][2].getPlayer() !== undefined
            && this.cells[0][2].getPlayer().getName() === player.getName()
            && this.cells[1][1].getPlayer() !== undefined
            && this.cells[1][1].getPlayer().getName() === player.getName()
            && this.cells[2][0].getPlayer() !== undefined
            && this.cells[2][0].getPlayer().getName() === player.getName()
        ) {
            hasWinner = true;
        }
        return hasWinner;
    }

    restart() {
        this.cells = [[], [], []];
        this.currentPlayer = new Player("X");
        this.initCells(this.cells);
        this.running = true;
        this.winner = null;
        this.step = 0;
    }
}

function restart() {
    var tds = document.querySelectorAll("td");
    for (var i = 0; i < tds.length; i++) {
        tds[i].children[0].innerText = "";
    }
    board.restart();
}

var board = new Board();