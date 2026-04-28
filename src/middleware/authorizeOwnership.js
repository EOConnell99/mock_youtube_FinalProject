import { getChannelById } from '../services/channelService.js';

export async function authorizeChannelOwnership(req, res, next) {
    const id = parseInt(req.params.id);
    const channel = await getChannelById(id);
    if (channel.user_id !== req.user.id) {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}

