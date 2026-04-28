import express from 'express';
import { createChannel, getAllChannels, } from '../controllers/channelController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createChannel);
router.get('/', channelController.getAllChannels);
router.get('/:id', channelController.getChannelById);
router.put('/:id', authenticateToken, channelController.updateChannel);
router.delete('/:id', authenticateToken, channelController.deleteChannel);

export default router;