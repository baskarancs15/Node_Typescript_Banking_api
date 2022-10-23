
import express from 'express';
import { userRoute } from './v1/user.routes';

export const routes = express.Router();
routes.use(userRoute);