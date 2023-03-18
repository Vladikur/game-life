export default class Popup {
    constructor() {
        this.popups = document.querySelectorAll('.js-popup')
        this.btnsOpenPopup = document.querySelectorAll('.js-info-button')
        this.btnsClosePopup = document.querySelectorAll('.js-btn-close')

        this.addEventListeners()
    }

    addEventListeners() {
        this.btnsOpenPopup.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.openPopup(e)
            })
        })

        this.btnsClosePopup.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.closePopup(e)
            })
        })
    }

    openPopup(e) {
        const popupData = e.currentTarget.dataset.button

        this.popups.forEach((popup) => {
            const isPopup = popup.dataset.popup === popupData

            popup.classList.toggle('_open', isPopup)
        })
    }

    closePopup(e) {
        const popup = e.target.closest('.js-popup')
        popup.classList.remove('_open')
    }
}
