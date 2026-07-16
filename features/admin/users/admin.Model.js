
export default class adminModels{
    constructor(name,username,email,phoneno,password,image) {
        this.name=name;
        this.username=username;
        this.email=email;
        this.phoneno=phoneno;
        this.password=password;
        this.image=image;
        this.createdAt=new Date();
        this.updateAt=new Date();
        
    }
}