import { getChannelById } from '../services/channelService.js';
import { getVideoById } from '../services/VideoService.js';

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

export async function authorizeVideoOwnershipCreate(req, res, next) {
    const channel_id = parseInt(req.body.channel_id);
    const channel = await getChannelById(channel_id);
    if (channel.user_id !== req.user.id) {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}

export async function authorizeVideoOwnershipUpdateDelete(req, res, next) {
    const id = parseInt(req.params.id);
    const video = await getVideoById(id);
    const channel = await getChannelById(video.channel_id);
    console.log(video.channel_id);
    console.log(req.user.id);
    console.log(channel);
    console.log(channel.user_id);
    if (channel.user_id !== req.user.id) {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}