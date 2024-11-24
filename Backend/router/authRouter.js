import { Router } from 'express';
import { login } from '../controller/loginController.js';
  // Import the login controller function

const authRouter = Router();

// POST /login route
authRouter.post('/login', login);

export default authRouter;
