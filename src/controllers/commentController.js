import {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
} from '../services/commentService.js';

export async function getAllCommentsHandler(req, res) {
    /*const {
      search = '',
      sortBy = 'id',
      order = 'asc',
      offset = 0,
      limit = 5,
    } = req.query;
  
    const options = {
      search,
      sortBy,
      order,
      offset: parseInt(offset),
      limit: parseInt(limit),
    };*/
    let Comments = await getAllComments(/*options*/);
    res.status(200).json(Comments);
}

export async function getCommentByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const Comment = await getCommentById(id);
    res.status(200).json(Comment);
}

export async function createCommentHandler(req, res) {
    const { content, video_id } = req.body;
    const newComment = await createComment({ content, video_id, user_id: req.user.id });
    res.status(201).json(newComment);
}

export async function updateCommentHandler(req, res) {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    const updatedComment = await updateComment(id, { content });
    res.status(200).json(updatedComment);
}

export async function deleteCommentHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteComment(id);
    res.status(204).send();
}
