import * as zod from "zod"
export const schema = zod.object({

    name: zod.string().nonempty('Name is Required')
        .min(3, 'Name min 3 char').max(5, 'Name max 5 char'),


    email: zod.string().nonempty('Email is required')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),

    password: zod.string().nonempty('Password is required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid'),

    rePassword: zod.string().nonempty('rePassword is required'),
    

    phone: zod.string().nonempty('Phone Is Req')
        .regex(/^01[0125][0-9]{8}$/, 'Invalid')


}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'Invalid Repassword' })