export class UsersModels {
    constructor(user) {
        this.name = user.name,
        this.email = user.email,
        this.password = user.password,
        this.license = user.license,
        this.expiry_date = user.expiry_date
    }
}