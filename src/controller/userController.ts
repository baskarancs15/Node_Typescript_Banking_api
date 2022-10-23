import {NextFunction, Request, Response } from "express";
import {createUser,getUserById,deleteUserById} from '../services/userService';


// Add-newUser
export async function createUserHandler(req: Request,res:Response,next:NextFunction) {
    try {
        let data = req.body;
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

// get-UserByID
export async function getUserHandler(req:Request,res:Response,next:NextFunction) {
    try {
        let id = req.params.id;
        let result = await getUserById(id);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        next(err);
    }
}

//Delete-UserById
export async function deleteUserHandler(req:Request,res:Response,next:NextFunction) {
    try {
        let id = req.params.id;
        let result:any = await deleteUserById(id);
        res.status(result.code).json({
            status: "success" || "fail",
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        next(err);
    }
}
