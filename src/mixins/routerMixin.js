
export default {
    methods: {
        toEditPage(params) {
            this.$router.push({ name: "Edit", params: params })
        },
        toMainPage() {
            this.$router.push('/').catch(() => { }) // Avoided redundant navigation to current location
        }
    },
}