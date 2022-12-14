import { Router} from 'express';
import {createAccount,depositHandler,getUserBalanceHandler,userWithDrawHandler,userTransferHandler} from '../../controller/userController';
import validate from '../../validators/validators';
// import {createUserSchema,depositSchema,getBalanceValidator} from '../../database/models/user.model';
export const userRoute = Router();

//testRoutes
userRoute.get('/user', (req, res) => {
    res.send("What's up doc ?!");
});

//userRoutes
userRoute.post('/createAccount',createAccount);
userRoute.post('/deposit',depositHandler);
userRoute.get('/getUserBalanceById/:userId',getUserBalanceHandler);
userRoute.put('/withdraw',userWithDrawHandler);
userRoute.post('/transfer',userTransferHandler);


