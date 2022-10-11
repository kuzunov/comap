import { IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IComment {
    id:IdType,
    body:string,
    authorId:IdType,
    created:number,
    modified:number,
    parentId:IdType
}