import { IdType } from "./sharedTypes";

export interface IReview {
    id:IdType
    body:string,
    authorId:string,
    created:string,
    modified:string,
    rating:number;
}