import prisma from '../config/db.js';

export async function create(commentData) {
    const newComment = await prisma.comment.create({ data: commentData });
    return newComment;
}



export async function findAll() {
    const comments = await prisma.comment.findMany({
        select: {
            user_id: true,
            video_id: true,
            content: true
        }
    });
    return comments;
}

export async function findById(id) {
    const comment = await prisma.comment.findUnique({
        where: { id }
    });
    return comment
}

export async function update(id, updatedData) {
    try {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: updatedData,
        });
        return updatedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try {
        const deletedComment = await prisma.comment.delete({
            where: { id },
        });
        return deletedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}