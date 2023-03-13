import 'normalize.css'
import '../scss/index.scss'
import getField from './Field'
import Figures from './Figures'

class Life {
    constructor() {
        this.isGameRunning = false
        this.counter = 0
        this.game = null
        this.cell = 10
        this.map = 800
        this.speedText = 'normal'
        this.gameSpeed = 100
        this.mapColor = '#2e3146'
        this.cellColor = '#dc475c'
        this.gridColor = 'rgba(255, 255, 255, 0.1)'
        this.cells = getField()
        this.newCells = getField()

        this.counterElement = document.querySelector('.js-counter')
        this.btnRun = document.querySelector('.js-run-btn')
        this.btnStop = document.querySelector('.js-stop-btn')
        this.btnRestart = document.querySelector('.js-restart-btn')
        this.btnSpeed = document.querySelector('.js-speed-btn')
        this.btnsExampe = document.querySelectorAll('.js-life-example')
        this.canvas = document.querySelector('.js-game-life')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.map
        this.canvas.height = this.map

        this.figures = new Figures()

        this.btnSpeed.textContent = `Speed: ${this.speedText}`

        this.runGame()
        this.addListeners()
    }

    drawGame() {
        this.ctx.clearRect(0, 0, this.map, this.map)
        this.ctx.fillStyle = this.mapColor
        this.ctx.fillRect(0, 0, this.map, this.map)

        this.cells.forEach((item, ind) => {
            this.ctx.beginPath()
            this.ctx.moveTo(0, ind * this.cell)
            this.ctx.lineTo(this.map, ind * this.cell)
            this.ctx.strokeStyle = this.gridColor
            this.ctx.lineWidth = 1
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.moveTo(ind * this.cell, 0)
            this.ctx.lineTo(ind * this.cell, this.map)
            this.ctx.strokeStyle = this.gridColor
            this.ctx.lineWidth = 1
            this.ctx.stroke()
        })

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
                    const topRow =
                        typeof this.cells[rowInd - 1] !== 'undefined' ?
                            this.cells[rowInd - 1] :
                            this.cells[row.length - 1]

                    const currentRow = this.cells[rowInd]

                    const bottomRow =
                        typeof this.cells[rowInd + 1] !== 'undefined' ?
                            this.cells[rowInd + 1] :
                            this.cells[0]

                    const topLeftCell = typeof topRow[colInd - 1] !== 'undefined' ?
                        topRow[colInd - 1] :
                        topRow[row.length - 1]

                    const topCell = topRow[colInd]

                    const topRightCell = typeof topRow[colInd + 1] !== 'undefined' ?
                        topRow[colInd + 1] :
                        topRow[0]

                    const leftCel = typeof currentRow[colInd - 1] !== 'undefined' ?
                        currentRow[colInd - 1] :
                        currentRow[row.length - 1]

                    const rightCell = typeof currentRow[colInd + 1] !== 'undefined' ?
                        currentRow[colInd + 1] :
                        currentRow[0]

                    const bottomLeftCell = typeof bottomRow[colInd - 1] !== 'undefined' ?
                        bottomRow[colInd - 1] :
                        bottomRow[row.length - 1]

                    const bottomCell = bottomRow[colInd]

                    const bottomRightCell = typeof bottomRow[colInd + 1] !== 'undefined' ?
                        bottomRow[colInd + 1] :
                        bottomRow[0]

                    const neighbours = [
                        topLeftCell,
                        topCell,
                        topRightCell,
                        leftCel,
                        rightCell,
                        bottomLeftCell,
                        bottomCell,
                        bottomRightCell,
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

    changeSpeed() {
        if (this.speedText === 'slow') {
            this.gameSpeed = 100
            this.speedText = 'normal'
        } else if (this.speedText === 'fast') {
            this.gameSpeed = 200
            this.speedText = 'slow'
        } else if (this.speedText === 'normal') {
            this.gameSpeed = 20
            this.speedText = 'fast'
        }

        this.btnSpeed.textContent = `Speed: ${this.speedText}`
        clearInterval(this.game)
        this.runGame()
    }

    createFigure(e) {
        const figure = e.currentTarget.dataset.figure
        const cells = this.figures.newFigure(figure)

        this.resetGame(cells)
    }

    resetGame(cells) {
        this.isGameRunning = false
        this.cells = cells
        this.counter = 0
        this.counterElement.textContent = this.counter
    }

    addListeners() {
        this.btnRun.addEventListener('click', () => {
            this.isGameRunning = true
        })

        this.btnStop.addEventListener('click', () => {
            this.isGameRunning = false
        })

        this.btnsExampe.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.createFigure(e)
            })
        })

        this.btnSpeed.addEventListener('click', () => {
            this.changeSpeed()
        })

        this.btnRestart.addEventListener('click', () => {
            const cells = getField()

            this.resetGame(cells)
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
