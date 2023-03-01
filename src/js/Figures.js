import getField from './Field'

export default class Figures {
    newFigure(figure) {
        let fieldWithFigure

        switch (figure) {
            case 'long-liver-1':
                fieldWithFigure = this.createLongLiver1()
                break;
            case 'glider':
                fieldWithFigure = this.createGlider()
                break;
            case 'locomotive':
                fieldWithFigure = this.createLocomotive()
                break;
            case 'pulsar':
                fieldWithFigure = this.createPulsar()
                break;
            case 'glider-gun':
                fieldWithFigure = this.createGliderGun()
                break;
        }

        return fieldWithFigure
    }

    createLongLiver1() {
        const figure = getField()

        figure[38][38] = 1
        figure[39][38] = 1
        figure[39][39] = 1
        figure[40][38] = 1
        figure[40][37] = 1

        return figure
    }

    createGlider() {
        const figure = getField()

        figure[38][38] = 1
        figure[39][38] = 1
        figure[39][37] = 1
        figure[40][37] = 1
        figure[38][36] = 1

        return figure
    }

    createLocomotive() {
        const figure = getField()

        figure[39][38] = 1
        figure[39][37] = 1
        figure[40][37] = 1
        figure[38][36] = 1
        figure[38][37] = 1
        figure[39][36] = 1
        figure[40][36] = 1
        figure[40][40] = 1
        figure[42][40] = 1
        figure[38][40] = 1
        figure[36][40] = 1
        figure[35][41] = 1
        figure[35][42] = 1
        figure[35][43] = 1
        figure[35][44] = 1
        figure[43][41] = 1
        figure[43][42] = 1
        figure[43][43] = 1
        figure[43][44] = 1
        figure[42][44] = 1
        figure[41][44] = 1
        figure[35][44] = 1
        figure[36][44] = 1
        figure[37][44] = 1
        figure[38][43] = 1
        figure[40][43] = 1

        return figure
    }

    createPulsar() {
        const figure = getField()

        figure[38][38] = 1
        figure[39][38] = 1
        figure[40][39] = 1
        figure[41][40] = 1
        figure[42][41] = 1
        figure[42][42] = 1
        figure[41][43] = 1
        figure[40][44] = 1
        figure[38][45] = 1
        figure[39][45] = 1
        figure[37][44] = 1
        figure[36][43] = 1
        figure[35][42] = 1
        figure[35][41] = 1
        figure[36][40] = 1
        figure[37][39] = 1

        return figure
    }

    createGliderGun() {
        const figure = getField()

        figure[30][21] = 1
        figure[30][22] = 1
        figure[31][21] = 1
        figure[31][22] = 1
        figure[30][31] = 1
        figure[31][31] = 1
        figure[32][31] = 1
        figure[29][32] = 1
        figure[28][33] = 1
        figure[28][34] = 1
        figure[33][32] = 1
        figure[34][33] = 1
        figure[34][34] = 1
        figure[31][35] = 1
        figure[29][36] = 1
        figure[33][36] = 1
        figure[32][37] = 1
        figure[31][37] = 1
        figure[30][37] = 1
        figure[31][38] = 1
        figure[30][41] = 1
        figure[29][41] = 1
        figure[28][41] = 1
        figure[30][42] = 1
        figure[29][42] = 1
        figure[28][42] = 1
        figure[27][43] = 1
        figure[31][43] = 1
        figure[31][45] = 1
        figure[32][45] = 1
        figure[27][45] = 1
        figure[26][45] = 1
        figure[29][55] = 1
        figure[28][55] = 1
        figure[29][56] = 1
        figure[28][56] = 1

        return figure
    }
}
