
const tiles = Array.from(document.querySelectorAll('.tile'))
const playerDisplay = document.querySelector('.player-display')
const declare = document.querySelector('.declare-result')
const resetButton = document.querySelector('#reset')

let board = [' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ']
let currentPlayer = 'X'
let gameActive = true

const playerXWins = 'playerXWins'
const playerOWins = 'playerOWins'
const tie = 'tie'


const winningTile = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
        return false
    }
    return true
}

const updateBoard = (index) => {
    board[index] = currentPlayer
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X'? 'O' : 'X'
    playerDisplay.innerText = currentPlayer
    playerDisplay.classList.add(`player${currentPlayer}`)
}

const result = (type) => {
    switch(type) {
        case playerOWins:
            declare.innerHTML = 'Player <span class="playerO">O</span>  wins!'
        break

        case playerXWins:
            declare.innerHTML = 'Player <span class="playerX">X</span>  wins!'
        break

        case tie:
            declare.innerText = "It's a Tie!"
    }
    declare.classList.remove('hide')
}

function resultValidation() {
    let winRound = false
    for (let i = 0; i <= 7; i++) {
        const winTile = winningTile[i]
        const a = board[winTile[0]]
        const b = board[winTile[1]]
        const c = board[winTile[2]]
        if (a === " " || b === " " || c === " ") {
            continue
        }

        if (a === b && b === c) {
            winRound = true
            break
        }
    }

    if (winRound) {
        result(currentPlayer === "X" ? playerXWins : playerOWins)
        gameActive = false
        return
    }

    if (!board.includes(" ")) result(tie)

}

const userAction = (tile, index) => {
    if (isValidAction(tile) && gameActive) {
        tile.innerText = currentPlayer
        tile.classList.add(`player${currentPlayer}`)
        updateBoard(index)
        resultValidation()
        changePlayer()
    }
}

tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index))
} )

const resetBoard = () => {
    board = [' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ']
    gameActive = true
    declare.classList.add('hide')

    if (currentPlayer === 'O') {
        changePlayer()
    }

    tiles.forEach(tile => {
        tile.innerText = ''
        tile.classList.remove('playerX')
        tile.classList.remove('playerO')
    })
}

resetButton.addEventListener('click', resetBoard)