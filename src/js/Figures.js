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
}
