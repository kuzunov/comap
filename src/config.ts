import * as yup from "yup";
import { USER_GENDER, USER_ROLE, USER_STATUS } from "./model/user"





export const validation = {
                    firstName: new RegExp(/^[a-zA-Z]{2,12}$/),
                    lastName:new RegExp(/^[a-zA-Z]{2,12}$/),
                    username : new RegExp(/^[a-zA-Z]{5,15}$/),
                    password:new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
                    avatar:new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i),
                    description:new RegExp(/^.{1,512}$/)
                }
export const USER_FORM_SCHEMA = yup.object({
    id: yup.string(),
    username: yup.string().min(5).max(15).matches(/^[aA-zZ\s]+$/,"should only be letters").required(),
    password: yup.string().min(8).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*^#?&])[A-Za-z\d@$!%^*#?&]{8,}$/,"should contain letters, at least one number and at least one special character(!@#$%^&)").required(),
    firstName: yup.string().min(2).max(15).required(),
    lastName: yup.string().min(2).max(15).required(),
    description: yup.string().max(512),
    avatar: yup.string().url(),
    role: yup.mixed<USER_ROLE>().oneOf([USER_ROLE.ADMIN,USER_ROLE.USER,USER_ROLE.GUEST]),
    gender: yup.mixed<USER_GENDER>().oneOf(['m','f']).required(),
    status: yup.mixed<USER_STATUS>().oneOf([USER_STATUS.ACTIVE,USER_STATUS.DEACTIVATED,USER_STATUS.SUSPENDED]),

}).required();  

export const USER_LOGIN_SCHEMA = yup.object({
    username: yup.string().min(5).max(15).required(),
    password: yup.string().min(8).required()

}).required();

export const EVENT_ADD_SCHEMA = yup.object({
    name:yup.string().min(3).max(15).required(),
    date:yup.date(),
    //organizer:yup.string(),
    poster:yup.string(),
    description:yup.string().min(2).max(512).required(),
})