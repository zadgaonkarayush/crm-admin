import type { Role } from "../types"
export const Auth =()=>{
   return{
     isAuthenticated:true,
        role:'admin' as Role,
        user:{
            email:"admin@gmail.com",
            password:"123456"
        }
   }
};