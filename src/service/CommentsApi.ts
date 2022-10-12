import { API_BASE_URL } from "../evn.var.config";
import { IComment } from "../model/comment";
import { IdType } from "../model/sharedTypes";
import { ApiClient, ApiClientImpl } from "./rest-api-client";
import { UsersApi } from "./UsersApi";

export interface CommentsApiClientI extends ApiClient<IdType, IComment> {
    createComment(e:Partial<IComment>, parentType:string, parentId:IdType,token?:string):Promise<IComment>
    getByParentId(parent:string,parentId:IdType):Promise<(IComment&{authorUsername:string})[]>;
  }

class CommentsApiE extends ApiClientImpl<IdType, IComment> implements CommentsApiClientI {
   createComment(entityWithoutId: Partial<IComment>,parentType:string,parentId:IdType, token?:string): Promise<IComment> {
    entityWithoutId.parentId = parentId;   
    return this.handleRequest(
        `${API_BASE_URL}/api/${parentType}/${parentId}/comments`,
        {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(entityWithoutId)
        }
      )
   }
   async getByParentId (parent:string,parentId:IdType) {
      const res = await  this.handleRequest(`${API_BASE_URL}/api/${parent}/${parentId}/comments/`,
      {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      let commentsArray:IComment[] = await res;
      let commentsWithUsername:(IComment & {authorUsername:string})[] = [];
      commentsArray.map(async (comment) => {
        const author = await UsersApi.findById(comment.authorId);
        commentsWithUsername.push({...comment, authorUsername: author.username})
      })
      return commentsWithUsername;
   }
  }

export const CommentsApi: CommentsApiClientI = new CommentsApiE("comments");
