import * as channelService from '../services/channelService.js';

export async function createChannel(req, res, next) {
    try {
        const channel = await channelService.createChannel(req.body, req.user.id);
        res.status(201).json(channel);
    } catch (err) {
        next(err);
    }
}

export async function getAllChannels(req, res, next) {
    try {
        const channels = await channelService.getAllChannels();
        res.json(channels);
    } catch (err) {
        next(err);
    }
}

export async function getChannelById(req, res, next) {
    try {
        const channel = await channelService.getChannelById(req.params.id);
        res.json(channel);
    } catch (err) {
        next(err);
    }
}

export async function updateChannel(req, res, next) {
    try {
        const channel = await channelService.updateChannel(
            req.params.id,
            req.body,
            req.user.id
        );
        res.json(channel);
    } catch (err) {
        next(err);
    }
}

export async function deleteChannel(req, res, next) {
    try {
        const channel = await channelService.deleteChannel(
            req.params.id,
            req.user.id
        );
        res.json(channel);
    } catch (err) {
        next(err);
    }
}