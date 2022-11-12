import {NextFunction, Request, Response } from "express";
import {createUser,depositAmount,getBalanceByUserId,userWithDrawById,userTransferById} from '../services/userService';


// Function to Create a new account.
export async function createAccount(req: Request,res:Response,next:NextFunction) {
    try {
        let data = req.body;
        console.log(data);
        let result = await createUser(data);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        next(err);
    }
}


// Function to deposit amount.
export async function depositHandler(req:Request,res:Response,next:NextFunction) {
    try {
        let data = req.body;
        let result:any = await depositAmount(data);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        next(err);
    }
}

// Function to check balance.
export async function getUserBalanceHandler(req:Request,res:Response,next:NextFunction) {
    try {
        let userId = req.params.userId;
        let result:any = await getBalanceByUserId(userId);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        next(err);
    }
}


// Function to withdraw.
export async function userWithDrawHandler(req:Request,res:Response,next:NextFunction) {
    try {
        let data = req.body;
        let result = await userWithDrawById(data);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result,
        });
    } catch (err: any) {
        next(err);
    }
}

// Function to transfer.
export async function userTransferHandler(req:Request,res:Response,next:NextFunction) {
    try {
        let data = req.body;
        let result = await userTransferById(data);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result,
        });
    } catch (err: any) {
        next(err);
    }
}


