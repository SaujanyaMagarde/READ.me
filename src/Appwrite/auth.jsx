import Conf from './configuration'
import {Client,Account,ID} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(Conf.url)
        .setProject(Conf.projectid)
        this.account = new Account(this.client);
    }

    async CreateAccount({email,password,name}){
        try{
            const useraccount = await this.account.create(ID.unique(),email,password,name)

            if(useraccount){
                return this.Login({email,password})
            }
            else{
                return null;
            }
        }
        catch(error){
            throw error;
        }
    }

    async Login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async GetCurrentuser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("appwrite service :: getcurrentuser",error)
        }
        return null;
    }

    async Logout(){
        try{
             await this.account.deleteSessions()
        }
        catch(error){
            throw error
        }
    }
}
const Authservice = new AuthService();

export default Authservice;
