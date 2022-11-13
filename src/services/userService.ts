import { Request, Response } from "express";
import mongoose from "mongoose";
export type TObjectId = mongoose.ObjectId;
export const ObjectId = mongoose.Types.ObjectId;
import UserModel from '../../src/database/models/user.model';
import AccountModel from '../../src/database/models/account.model';
import statusCodes from '../config/httpCodes';
import autoIncrement from '../utils/autoincrement'

export async function createUser(data:any) {
    try {
            console.log("came in create service",data);
            let name = data.name;
            let autoId = await autoIncrement("UID");
            let newUserId = `UID_100${autoId}`;
            data.userId = newUserId;
            let result = await UserModel.create(data);
            if(result){
                let accountData = {
                    "accountNo": newUserId,
                    "amount": "0",
                    "depositLimit": 0,
                    "withdrawLimit": 0
                }
                await AccountModel.create(accountData);
                return {
                    code: statusCodes.HTTP_OK,
                    message: `Account Created for ${name} Successfully`,
                    data: result,
                }
            }else{
                return {
                    code:404,
                    message: `Account Not Created Successfully`,
                }
            }
          
    } catch (err: any) {
        throw new Error(err);
    }
}


export async function depositAmount(data:any) {
    try {
        console.log("came in deposit service",data);
        let checkAccountisExist = await AccountModel.findOne({accountNo: data.accountNo});
        console.log(checkAccountisExist);
        if(!checkAccountisExist){
            return {
                code: 404,
                message: `Please provide a valid account number`
            }
        }
        if(checkAccountisExist.amount > 100000){
            return {
                code: 404,
                message: `Account balance cannot exceed $100000`
            }
        }

        if(data.amount < 500){
            return {
                code: 404,
                message: `Minimum deposit amount is 500`
            }
        }
        if(data.amount > 50000){
            return {
                code: 404,
                message: `Maximum deposit amount is 50000`
            }
        }
        
      
        let accountData:any= await AccountModel.findOne({accountNo: data.accountNo},{_id:0})
        if(accountData.depositLimit>=3){
            return {
                code: 404,
                message: `Only 3 deposits are allowed in a day`
            } 
        }
        let limit = accountData.depositLimit+1;
        let sumResult = parseInt(accountData.amount)+parseInt(data.amount);
        data.amount = sumResult.toString();
        data.depositLimit = limit;
        let updateQuery = {
            $set: data,
        };
        console.log("finalresult",data);
        let result = await AccountModel.findOneAndUpdate(
            { accountNo: data.accountNo }, updateQuery, { new: true });
            return {
                code: statusCodes.HTTP_OK,
                message: `${data.amount} Amount Deposited Successfully`,
                data: result,
            }
    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }
}


export async function getBalanceByUserId(userId:String) {
    try {
        console.log("came in account service",userId);
        if(!userId){
            return {
                code: 422,
                message: `${userId} not valid`
            } 
        }
        
        let checkUserExist = await AccountModel.findOne({accountNo:userId});
        console.log("came in AccountModel",checkUserExist);
        if(!checkUserExist){
            return {
                code: 404,
                message: `User with id ${userId} not Found`
            }
        }else{
            return {
                code: statusCodes.HTTP_OK,
                message: "Your Balance is Fetched Successfully",
                data: checkUserExist.amount,
            }
        }
       
    } catch (err: any) {
        throw new Error(err);
    }
}


export async function userWithDrawById(data:any) {
    try {
        let accountNo = data.accountNo;
        let withdrawAmount = data.withdrawAmount;
        
        let userData = await AccountModel.findOne({accountNo:accountNo});
        if (!userData) {
            console.log(!userData);
          return {
            code: 404,
            message: "Please provide a valid account number",
          };
        }

        if(withdrawAmount < 1000){
            return {
                code: 404,
                message: "Minimum withdrawal amount is 1000",
            };
        }
        if(withdrawAmount > 25000){
            return {
                code: 404,
                message: "Maximum withdrawal amount is 25000",
            };
        }
        
        console.log("userData",userData);
        if(userData.amount < withdrawAmount){
            return {
                code: 404,
                message: "Insufficient balance",
              };
        }
       
        if(userData.withdrawLimit >=3){
            return {
                code: 404,
                message: "Only 3 withdrawals are allowed in a day",
              };
        }
          let remainingAmount = userData.amount - withdrawAmount;
          
          console.log(remainingAmount);

          let limit = userData.withdrawLimit+1; 
          console.log(remainingAmount,limit);
          await AccountModel.findOneAndUpdate({accountNo:accountNo},{$set:{amount:remainingAmount,withdrawLimit:limit}});
          return {
            code: statusCodes.HTTP_OK,
            message: `Your Balance is ${remainingAmount}` ,
            data:remainingAmount
          };
      } catch (err:any) {
        throw new Error(err)
      }
}


export async function userTransferById(data:any) {
    try {
        console.log(data.amount);
        let senderId = data.sender;
        let recieverId = data.reciever;
        let amount = data.amount;
        console.log(amount);
        //check sender
        let senderData = await AccountModel.findOne({accountNo:senderId});
        let recieverData = await AccountModel.findOne({accountNo:recieverId});
        if(!senderData){
            return{
                code: 404,
                message: `${senderId} not a valid user`, 
            } 
        }
        if(!recieverData){
        return{
                code: 404,
                message: `${recieverId} not a valid user`, 
            } 
        }
        if(amount < 1000){
            return{
                code: 404,
                message: `Minimum Transfer amount is 1000 for account ${senderId}`, 
            }
        }

        if(amount >= 30000){
            return{
                code: 404,
                message: `Maximum Transfer amount is 30000 for account ${recieverId}`, 
            }
        }

        let checkSenderBalance:any = await AccountModel.findOne({accountNo:senderId})
        let senderBalance = parseInt(checkSenderBalance.amount)
        if(!checkSenderBalance){
            return{
                code: 404,
                message: "Please provide a valid userId!", 
            }
        }
        console.log(typeof senderBalance);
        console.log(typeof amount);
        if(amount > senderBalance){ 
            return{
                code: 404,
                message: "Not Enough Balance to Transfer", 
            }
        }
       
        
        let updateSenderBalance = senderBalance - amount;
        await AccountModel.findOneAndUpdate({accountNo:senderId},{$set:{amount:updateSenderBalance}});
       
        let getRecieverBalance = await AccountModel.findOne({accountNo:recieverId},{amount:1,_id:0});
        if(!getRecieverBalance){
            return{
                code: 404,
                message: "Please provide a valid userId!", 
            }
        }
        
        let updateRecieverBalance =  parseInt(getRecieverBalance!.amount) + amount;
        console.log(updateRecieverBalance)
        let result = await AccountModel.findOneAndUpdate({accountNo:recieverId},{$set:{amount:updateRecieverBalance}});
        if(result){
            return {
                    code: statusCodes.HTTP_OK,
                    message: `Successful`
                  };
        }else{
            return{
                code: 404,
                message: "Transfer not Valid!", 
            }
        }
      } catch (err:any) {
        throw new Error(err)
      }
}

