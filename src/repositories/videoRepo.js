import prisma from '../config/db.js';

export async function create(videoData) {
    const newVideo = await prisma.video.create({ data: videoData });
    return newVideo;
}



export async function findAll() {
    const videos = await prisma.video.findMany({
        select: {
            id: true,
            channel_id: true,
            title: true,
            desc: true
        }
    });
    return videos;
}

export async function findById(id) {
    const video = await prisma.video.findUnique({
        where: { id }
    });
    return video
}

export async function update(id, updatedData) {
    try {
        const updatedVideo = await prisma.video.update({
            where: { id },
            data: updatedData,
        });
        return updatedVideo;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try {
        const deletedVideo = await prisma.video.delete({
            where: { id },
        });
        return deletedVideo;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}