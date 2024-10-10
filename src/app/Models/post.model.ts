
export class Post {

    username: string = '';
    avatar: string = '';
    timestamp: Date = new Date();
    textcontent: string ='';

    constructor(username: string, avatar: string, timestamp: Date, textcontent: string) {
        this.username = username;
        this.avatar = avatar;
        this.timestamp = timestamp;
        this.textcontent = textcontent;
    }
    
}
