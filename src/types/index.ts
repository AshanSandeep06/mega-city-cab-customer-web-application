export interface AuthRequestDto {
    email: string;
    password: string;
}

export interface LoginResponse {
    code: number;
    userName: string;
    message: string;
    role: string;
    jwt: string;
    userId: number;
    email: string;
}

export interface UserDto {
    id?: number;
    username: string;
    password: string;
    contactNumber: string;
    email: string;
    address: string;
    nic: string;
    status: string;
    role: string;
}

export interface User {
    id?: number;
    username: string;
    password: string;
    contactNumber: string;
    email: string;
    address: string;
    nic: string;
    status: string;
    role: string
}
