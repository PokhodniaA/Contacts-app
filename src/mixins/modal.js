export default {
    data: () => ({
        showModal: false
    }),
    methods: {
        openModal() {
            this.showModal = true
        },
        closeModal() {
            console.log('close');
            this.showModal = false
        }
    }
}