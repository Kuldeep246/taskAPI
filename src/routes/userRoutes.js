import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { createUser, getUser, getAllUsers } from '../controllers/userController.js' ;

const router = express.Router();

router.post('/', createUser);
router.get('/:id',authMiddleware, getUser);
router.get('/',authMiddleware, getAllUsers);

export default router;
