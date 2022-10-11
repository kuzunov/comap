import { API_BASE_URL } from "../evn.var.config";
import { IComment } from "../model/comment";
import { IdType } from "../model/sharedTypes";
import { ApiClient, ApiClientImpl } from "./rest-api-client";

export interface CommentsApiClientI extends ApiClient<IdType, IComment> {
    createComment(e:Partial<IComment>, parentId:IdType):Promise<IComment>
  }

class CommentsApiE extends ApiClientImpl<IdType, IComment> implements CommentsApiClientI {
   createComment(entityWithoutId: Partial<IComment>,parentId:IdType): Promise<IComment> {
    entityWithoutId.parentId = parentId;   
    return this.handleRequest(
        `${API_BASE_URL}/auth/login`,
        {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entityWithoutId)
        }
      )
   }
  }

export const CommentsApi: CommentsApiClientI = new CommentsApiE("comments");
