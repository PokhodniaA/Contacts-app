export default {
    methods: {
        openModal(type) {
            this.showModal[type] = true
        },
        closeModal(type) {
            this.showModal[type] = false
        }
    }
}