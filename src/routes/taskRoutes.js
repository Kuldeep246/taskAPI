import express from 'express';
import {
  createTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/',authMiddleware, createTask);
router.get('/:id',authMiddleware, getTask);
router.get('/',authMiddleware, getAllTasks);
router.put('/:id',authMiddleware, updateTask);
router.delete('/:id',authMiddleware, deleteTask);

export default router;
