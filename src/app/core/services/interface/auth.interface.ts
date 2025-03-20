export interface AuthInterface {
    nombre: string;
    email: string;
    password: string;
    rol: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface Me {
    id?: number;
    nombre: string;
    email: string;
    rol: string;
}