import {
    findAll,
    findById,
    create,
    update,
    remove,
} from '../repositories/channelRepo.js';

export async function getAllChannels() {
    return findAll();
}

export async function getChannelById(id) {
    const channel = await findById(id);
    if (channel) return channel;
    else {
        const error = new Error(`Channel ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createChannel(channelData) {
    return create(channelData);
}

export async function updateChannel(id, updatedData) {
    const updatedChannel = await update(id, updatedData);
    if (updatedChannel) return updatedChannel;
    else {
        const error = new Error(`Post ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteChannel(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Channel ${id} not found`);
        error.status = 404;
        throw error;
    }
}
