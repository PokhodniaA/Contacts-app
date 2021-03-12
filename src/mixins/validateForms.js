export default {
    methods: {
        isCorrectData(info, user) {
            return info.every((item) => {
                return !!user[item];
            });
        },
        getNewID(users) {
            const counterID = 1;
            const lengths = users.length;
            const newID = lengths > 0 ? users[lengths - 1].id + counterID : 0;
            return newID;
        },
        pushUser(user, users) {
            user.id = this.getNewID(users);
            users.push(user);
        },
        showNewUsers(users) {
            localStorage.setItem("users", JSON.stringify(users));
            this.toMainPage();
        }
    }
}