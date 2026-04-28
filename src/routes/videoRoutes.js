import express from 'express';
import {
    getAllVideosHandler,
    getVideoByIdHandler,
    createVideoHandler,
    updateVideoHandler,
    deleteVideoHandler,
} from '../controllers/videoController.js';

import {
    validateId,
    validateCreateVideo,
    validateUpdateVideo,
    //validateVideoQuery,
} from '../middleware/videoValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeVideoOwnershipCreate, authorizeVideoOwnershipUpdateDelete } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', /*validateVideoQuery*/ getAllVideosHandler);
router.get('/:id', validateId, getVideoByIdHandler);
router.post('/', authenticate, authorizeVideoOwnershipCreate, validateCreateVideo, createVideoHandler);
router.put(
    '/:id',
    authenticate,
    validateId,
    authorizeVideoOwnershipUpdateDelete,
    validateUpdateVideo,
    updateVideoHandler,
);
router.delete(
    '/:id',
    authenticate,
    validateId,
    authorizeVideoOwnershipUpdateDelete,
    deleteVideoHandler,
);

export default router;
