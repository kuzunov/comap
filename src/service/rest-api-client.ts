import { API_ENDPOINT } from "../evn.var.config";
import { IEvent } from "../model/event";
import { IOrganization } from "../model/organization";
import { IReview } from "../model/review";
import { Identifiable, IdType } from "../model/sharedTypes";

const API_BASE_URL = `${API_ENDPOINT}`;

export interface ApiClient<K, V extends Identifiable<K>> {
  findAll(): Promise<V[]>;
  findById(id: K): Promise<V>;
  create(entityWithoutId: Partial<V>): Promise<V>;
  update(entityWithoutId: V): Promise<V>;
  deleteById(id: K): Promise<V>;
}

export class ApiClientImpl<K, V extends Identifiable<K>>
  implements ApiClient<K, V>
{
  constructor(public apiCollectionSuffix: string) {}

  findByName(term: string): Promise<V[]> {
    return this.handleRequest(term);
  }
  findAll(): Promise<V[]> {
    return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
  }
  findById(id: K): Promise<V> {
    return this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`
    );
  }
  create(entityWithoutId: Partial<V>, token?: string): Promise<V> {
    return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(entityWithoutId),
    });
  }
  update(entity: V, token?: string): Promise<V> {
    return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(entity),
    });
  }
  deleteById(id: K, token?: string): Promise<V> {
    console.log({ id: id });
    return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
  }
  protected async handleRequest(url: string, options?: RequestInit) {
    try {
      const resp = await fetch(url, options);
      if (resp.status >= 400) {
        return Promise.reject(await resp.json());
      }
      return await resp.json();
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}
class EventsApiE extends ApiClientImpl<IdType, IEvent> {}
class OrganizationsApiE extends ApiClientImpl<IdType, IOrganization> {}
type DashboardApiI = {findAll:()=>{events:IEvent[],reviews:IReview[]}}

class DashboardApiC {
  findAll(): Promise<{events:IEvent[], reviews:({body:number,id:number})}> {
    return this.handleRequest(`${API_BASE_URL}/dashboard`);
  }
  protected async handleRequest(url: string, options?: RequestInit) {
    try {
      const resp = await fetch(url, options);
      if (resp.status >= 400) {
        return Promise.reject(await resp.json());
      }
      return await resp.json();
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

export const EventsApi = new EventsApiE("events");
export const OrganizationsApi = new OrganizationsApiE("organizations");
export const DashboardApi = new DashboardApiC();
