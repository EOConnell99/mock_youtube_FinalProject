import prisma from '../config/db.js';

export async function create(channelData) {
    const newChannel = await prisma.channel.create({ data: channelData });
    return newChannel;
}


export async function findAll() {
    const channels = await prisma.channel.findMany({
        select: {
            id: true,
            name: true,
            desc: true
        }
    });
    return channels;
}

export async function findById(id) {
    const channel = await prisma.channel.findUnique({
        where: { id }
    });
    return channel
}

export async function update(id, data) {
    try {
        const updatedChannel = await prisma.channel.update({
            where: { id },
            data: updatedData,
        });
        return updatedChannel;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try {
        const deletedChannel = await prisma.channel.delete({
            where: { id },
        });
        return deletedChanel;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}