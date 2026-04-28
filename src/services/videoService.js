import {
    findAll,
    findById,
    create,
    update,
    remove,
} from '../repositories/videoRepo.js';

export async function getAllVideos() {
    return findAll();
}

export async function getVideoById(id) {
    const video = await findById(id);
    if (video) return video;
    else {
        const error = new Error(`Video ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createVideo(videoData) {
    return create(videoData);
}

export async function updateVideo(id, updatedData) {
    const updatedVideo = await update(id, updatedData);
    if (updatedVideo) return updatedVideo;
    else {
        const error = new Error(`Post ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteVideo(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Video ${id} not found`);
        error.status = 404;
        throw error;
    }
}
