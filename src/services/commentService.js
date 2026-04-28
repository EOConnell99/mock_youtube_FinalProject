import {
    findAll,
    findById,
    create,
    update,
    remove,
} from '../repositories/commentRepo.js';

export async function getAllComments() {
    return findAll();
}

export async function getCommentById(id) {
    const comment = await findById(id);
    if (comment) return comment;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createComment(commentData) {
    return create(commentData);
}

export async function updateComment(id, updatedData) {
    const updatedComment = await update(id, updatedData);
    if (updatedComment) return updatedComment;
    else {
        const error = new Error(`Post ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteComment(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}
