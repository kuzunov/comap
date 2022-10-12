import { API_BASE_URL } from "../evn.var.config";
import { IdType } from "../model/sharedTypes";
import { IUser } from "../model/user";
import { ApiClient, ApiClientImpl} from "./rest-api-client";

export interface UserApiClientI extends ApiClient<IdType, IUser> {
    findByName(term: string): Promise<IUser[]>;
    login(user:Partial<IUser>): Promise<{token:string,user:IUser}>;
    checkUsernameUniqueness(username: string): Promise<boolean>;
    register(user:Partial<IUser>): Promise<IUser>;
  }

class UserApiE extends ApiClientImpl<IdType, IUser> implements UserApiClientI {
    findByName(term: string) {
      let srchUrl = `${API_BASE_URL}/${this.apiCollectionSuffix}/?q=${term}&attr=username,firstName,lastName`;
      return this.handleRequest(srchUrl);
    }
    checkUsernameUniqueness = async (username: string) => {
      let findName: [] = await this.handleRequest(
        `${API_BASE_URL}/${this.apiCollectionSuffix}/?username=${username}`
      );
      return findName.length > 0 ? false : true;
    };
    login = async (user:Partial<IUser>) => {
      return this.handleRequest(
        `${API_BASE_URL}/api/auth/login`,
        {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }
      );
    };
    register = async (user:Partial<IUser>) => {
      return await this.handleRequest(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
  }

export const UsersApi: UserApiClientI = new UserApiE("users");
