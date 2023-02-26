import 'normalize.css'
import '../scss/index.scss'
import getField from './Field'

class Life {
    constructor() {
        this.isGameRunning = false
        this.counter = 0
        this.game = null
        this.cell = 10
        this.map = 800
        this.gameSpeed = 100
        this.mapColor = '#2e3146'
        this.cellColor = '#ca354a'
        this.cells = getField()
        this.newCells = getField()

        this.counterElement = document.querySelector('.js-counter')
        this.btnRun = document.querySelector('.js-run')
        this.btnStop = document.querySelector('.js-stop')
        this.btnRestart = document.querySelector('.js-restart')
        this.canvas = document.querySelector('.js-game-life')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.map
        this.canvas.height = this.map

        this.runGame()
        this.addListeners()
    }

    drawGame() {
        this.ctx.clearRect(0, 0, this.map, this.map)
        this.ctx.fillStyle = this.mapColor
        this.ctx.fillRect(0, 0, this.map, this.map)

        this.cells.forEach((row, rowInd) => {
            row.forEach((col, colInd) => {
                if (col === 1) {
                    const x = colInd * this.cell
                    const y = rowInd * this.cell
                    this.ctx.fillStyle = this.cellColor
                    this.ctx.fillRect(x, y, this.cell, this.cell)
                }
            })
        })

        if (this.isGameRunning) {
            this.cells.forEach((row, rowInd) => {
                row.forEach((col, colInd) => {
                    const leftCel =
                        typeof this.cells[rowInd][colInd - 1] !== 'undefined' ?
                            this.cells[rowInd][colInd - 1] :
                            this.cells[rowInd][row.length - 1]

                    const rightCell =
                        typeof this.cells[rowInd][colInd + 1] !== 'undefined' ?
                            this.cells[rowInd][colInd + 1] :
                            this.cells[rowInd][0]

                    const neighbours = [
                        !this.cells[rowInd - 1] ? 0 : this.cells[rowInd - 1][colInd - 1],
                        !this.cells[rowInd - 1] ? 0 : this.cells[rowInd - 1][colInd],
                        !this.cells[rowInd - 1] ? 0 : this.cells[rowInd - 1][colInd + 1],
                        leftCel,
                        rightCell,
                        !this.cells[rowInd + 1] ? 0 : this.cells[rowInd + 1][colInd - 1],
                        !this.cells[rowInd + 1] ? 0 : this.cells[rowInd + 1][colInd],
                        !this.cells[rowInd + 1] ? 0 : this.cells[rowInd + 1][colInd + 1],
                    ]

                    const aliveNeighbours = neighbours.filter((el) => el === 1).length

                    if (col === 0 && aliveNeighbours === 3) {
                        this.newCells[rowInd][colInd] = 1
                    } else if (col === 1 && aliveNeighbours < 2) {
                        this.newCells[rowInd][colInd] = 0
                    } else if (col === 1 && aliveNeighbours > 1 && aliveNeighbours < 4) {
                        this.newCells[rowInd][colInd] = 1
                    } else if (col === 1 && aliveNeighbours > 3) {
                        this.newCells[rowInd][colInd] = 0
                    }
                })
            })

            this.counter++
            this.counterElement.textContent = String(this.counter)

            this.cells = this.newCells
            this.newCells = getField()
        }
    }

    runGame() {
        this.game = setInterval(() => {
            this.drawGame()
        }, this.gameSpeed)
    }

    addListeners() {
        this.btnRun.addEventListener('click', () => {
            this.isGameRunning = true
        })

        this.btnStop.addEventListener('click', () => {
            this.isGameRunning = false
        })

        this.btnRestart.addEventListener('click', () => {
            this.isGameRunning = false
            this.cells = getField()
            this.counter = 0
            this.counterElement.textContent = this.counter
        })

        this.canvas.addEventListener('click', (e) => {
            const x = e.offsetX
            const y = e.offsetY
            const col = Math.floor(x / this.cell)
            const row = Math.floor(y / this.cell)
            this.cells[row][col] = this.cells[row][col] === 1 ? 0 : 1
        })
    }

}

new Life()
