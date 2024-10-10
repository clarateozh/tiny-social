export class User {
    username: string;
    password: string;
    avatar: string;


    constructor(username: string, password: string, avatar: string){
        this.username = username;
        this.password = password;
        this.avatar = avatar;
    }
}
