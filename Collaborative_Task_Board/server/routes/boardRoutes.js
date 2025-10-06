import express from 'express';
import { authMiddleware } from '../Middleware/authMiddleware';

import{createBoard , getBoards} from '../'

const router = express.Router();

router.use(authMiddleware);
router.post('/', createBoard);
router.get('/', getBoards);

export default router;