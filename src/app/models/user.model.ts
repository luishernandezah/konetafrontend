export class UserModel{
    name:string;
    email:string;
    password:string;
    passwordconfig:any
    documento:number;
    direccion:string;
    role
    constructor(
        name:string,
        email:string,
        password:string,
        passwordconfig:any,
        documento:number,
        direccion:string,
        role:any
        ){

    this.name = name;
    this.email = email;
    this.password = password;
    this.documento = documento;
    this.direccion = direccion;
    this.passwordconfig = passwordconfig
          this.role =role
    }
}
