import * as channelRepo from '../repositories/channelRepository.js';
export async function createChannel(data, userId) {
    if (!data.name || !data.desc) {
        throw { status: 400, message: 'Missing fields' };
    }

    return await channelRepo.create({
        name: data.name,
        desc: data.desc,
        ownerId: userId
    });
}

export async function getAllChannels() {
    return await channelRepo.findAll();
}

export async function getChannelById(id) {
    const channelId = parseInt(id);

    if (isNaN(channelId) || channelId <= 0) {
        throw { status: 400, message: 'Invalid ID' };
    }

    const channel = await channelRepo.findById(channelId);

    if (!channel) {
        throw { status: 404, message: 'Channel not found' };
    }

    return channel;
}

export async function updateChannel(id, data, userId) {
    const channel = await getChannelById(id);

    if (channel.ownerId !== userId) {
        throw { status: 403, message: 'Forbidden' };
    }

    return await channelRepo.update(channel.id, data);
}

export async function deleteChannel(id, userId) {
    const channel = await getChannelById(id);

    if (channel.ownerId !== userId) {
        throw { status: 403, message: 'Forbidden' };
    }

    return await channelRepo.remove(channel.id);
}