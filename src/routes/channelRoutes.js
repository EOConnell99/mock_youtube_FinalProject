import express from 'express';
import {
    getAllChannelsHandler,
    getChannelByIdHandler,
    createChannelHandler,
    updateChannelHandler,
    deleteChannelHandler,
} from '../controllers/channelController.js';

import {
    validateId,
    validateCreateChannel,
    validateUpdateChannel,
    //validateChannelQuery,
} from '../middleware/channelValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeChannelOwnership, } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', /*validateChannelQuery*/ getAllChannelsHandler);
router.get('/:id', validateId, getChannelByIdHandler);
router.post('/', authenticate, validateCreateChannel, createChannelHandler);
router.put(
    '/:id',
    authenticate,
    validateId,
    authorizeChannelOwnership,
    validateUpdateChannel,
    updateChannelHandler,
);
router.delete(
    '/:id',
    authenticate,
    validateId,
    authorizeChannelOwnership,
    deleteChannelHandler,
);

export default router;
