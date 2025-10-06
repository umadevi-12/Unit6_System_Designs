import express from 'express';
import{register ,login, authMiddleware} from '../Middleware/authMiddleware';

import {createdTask , updateTask , deleteTask } from '../controllers/authController'

const router = express.Router();
router.post('/', authMiddleware , createdTask);
router.put(':/id' , authMiddleware , updateTask);
router.delete(':/id' , authMiddleware,deleteTask);

export default router;