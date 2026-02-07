export interface successLogin {
    message:string
    user:UserResponse 
    token:string
}

export interface faildLogin {
    statusMsg : string
    message : string
}

export interface UserResponse{
    name: string
    email: string
    role:string
    password:string
}


export type LogoutFunction = () => void;