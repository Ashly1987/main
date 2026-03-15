import { createContext } from "react" ;

const UserInfoContext = createContext({
    username : "Guest" ,
    isAdmin : true
}) ;

export default UserInfoContext ;