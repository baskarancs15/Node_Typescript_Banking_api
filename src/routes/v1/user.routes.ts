import { Router} from 'express';
import {createUserHandler,getUserHandler,deleteUserHandler} from '../../controller/userController';
export const userRoute = Router();

//testRoutes
userRoute.get('/user', (req, res) => {
    res.send("What's up doc ?!");
});

//userRoutes
userRoute.post('/add',createUserHandler);
userRoute.get('/getoneuser/:id',getUserHandler);
userRoute.delete('/deleteoneuser/:id',deleteUserHandler);
