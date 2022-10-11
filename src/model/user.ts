import { IdType, SKILLS } from "./sharedTypes";

export interface IUser {
  [key: string]: any;
  id: IdType|undefined;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: USER_GENDER;
  role: USER_ROLE;
  status: USER_STATUS;
  avatar: string | undefined;
  registered: number;
  modified: number;
  description?: string;
  location:google.maps.LatLngLiteral;
  skills?:SKILLS[];

};

export enum USER_STATUS {
    ACTIVE = 1,
    SUSPENDED,
    DEACTIVATED,
  }
  export enum USER_ROLE {
    GUEST = 0,
    USER,
    ORGANIZATOR,
    ADMIN
  }
  export type USER_GENDER = "m" | "f";

  export const Guest: IUser = {
    id:"0",
    username: "Guest",
    firstName: "",
    lastName: "",
    password: "",
    gender: "f",
    status: USER_STATUS.ACTIVE,
    avatar: "",
    description:"",
    registered: 0,
    modified: 0,
    location:{lat:0,lng:0},
    role: USER_ROLE.GUEST,
  };