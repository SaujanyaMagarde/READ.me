import Conf from './configuration'
import {Client,ID,Databases,Storage,Query} from "appwrite"

export class Services{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(Conf.url)
        .setProject(Conf.projectid)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createPost({title,slug,content,Featured_image,Status,userId}){
        try{
            return await this.databases.createDocument(Conf.databaseid,Conf.collectionid,slug,{
                title,
                content,
                Featured_image,
                Status,
                userId,
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async updatePost(slug,{title,content,Featured_image,Status}){
        try{
            return await this.databases.updateDocument(Conf.databaseid,Conf.collectionid,slug,
                {
                title,content,Featured_image,Status,
            })
        }
        catch(error){
            throw error
        }
    }

    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(Conf.databaseid,Conf.collectionid,slug)
            return true;
        }
        catch(error){
            throw error
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(Conf.databaseid,Conf.collectionid,slug)
            return true;
        }
        catch(error){
            throw error
        }
    }

    async getPostall(queries = [Query.equal("Status","active")]){
        try{
            return await this.databases.listDocuments(Conf.databaseid,Conf.collectionid,queries,)
        }
        catch(error){
            throw error
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(Conf.bucketid,ID.unique(),file)
        }
        catch(error){
            throw error
        }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(Conf.bucketid,fileId)
            return true;
        }
        catch(error){
            throw error
        }
    }

    getFilepreview(fileID){
        return this.bucket.getFilePreview(Conf.bucketid,fileID)
    }

}
const service = new Services();
export default service

