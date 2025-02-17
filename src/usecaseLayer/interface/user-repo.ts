import User from "../../domainLayer/userDomain";
import Cart from "../../domainLayer/cartDomain";


interface UserRepo {

    AddUser(user:User):Promise<User>;
    findByEmail(email:string): Promise<User | null>;
    findById(_id:string): Promise<User | null>
  
}

export default UserRepo;