export default {
    methods: {
        openModal(type, ...args) {
            this.showModal[type] = true
            if (args.length > 0) {
                this.showModal.args = args
                console.log(args);
            }
        },
        closeModal(type) {
            this.showModal[type] = false
        }
    }
}