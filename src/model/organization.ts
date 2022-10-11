import { IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IOrganization {
    id:IdType;
    name:string;
    members:IUser[];
    mainLocation: google.maps.MarkerOptions;
};