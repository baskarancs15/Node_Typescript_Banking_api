import { Request, Response } from "express";
import mongoose from "mongoose";
export type TObjectId = mongoose.ObjectId;
export const ObjectId = mongoose.Types.ObjectId;
import UserModel from '../../src/database/models/user.model';
import statusCodes from '../config/httpCodes';


export async function createUser(data:any) {
    try {
        console.log("came in service",data);
        let email = data.email;
        let checkEmailAlreadyExist = await UserModel.find({email:email});
        if(!checkEmailAlreadyExist){
            return {
                code: 404,
                message: "Email Already Exist!Please Choose Another Email"
            }
        }else{
            const result = await UserModel.create(data);
            return {
                code: statusCodes.HTTP_OK,
                message: "User Added Successfully",
                data: result,
            }
        }
    } catch (err: any) {
        throw new Error(err);
    }
}


export async function getUserById(id:any) {
    try {
        if(!ObjectId.isValid(id)){
            return {
                code: 422,
                message: `${id} not valid`
            } 
        }
        let checkUserExist = await UserModel.findById(id);
        if(!checkUserExist){
            return {
                code: 404,
                message: `User with id ${id} not Found`
            }
        }else{
            return {
                code: statusCodes.HTTP_OK,
                message: "User Fetched Successfully",
                data: checkUserExist,
            }
        }
       
    } catch (err: any) {
        throw new Error(err);
    }
}


export async function deleteUserById(id:any) {
    try {
        if(!ObjectId.isValid(id)){
            return {
                code: 422,
                message: `${id} not valid`
            } 
        }
        let user = await UserModel.findOne({_id: id});
        if (!user) {
            console.log(!user);
          return {
            code: 404,
            message: "User Not Exist",
          };
        } else {
          let data = await UserModel.findByIdAndDelete(id);
          return {
            code: statusCodes.HTTP_OK,
            message: "User Deleted Successfully",
          };
        }
      } catch (err:any) {
        throw new Error(err)
      }
}

