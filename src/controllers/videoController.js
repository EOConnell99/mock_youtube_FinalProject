import {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
} from '../services/VideoService.js';

export async function getAllVideosHandler(req, res) {
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
    let Videos = await getAllVideos(/*options*/);
    res.status(200).json(Videos);
}

export async function getVideoByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const Video = await getVideoById(id);
    res.status(200).json(Video);
}

export async function createVideoHandler(req, res) {
    const { title, desc, channel_id } = req.body;
    const newVideo = await createVideo({ title, desc, channel_id });
    res.status(201).json(newVideo);
}

export async function updateVideoHandler(req, res) {
    const id = parseInt(req.params.id);
    const { title, desc } = req.body;
    const updatedVideo = await updateVideo(id, { title, desc });
    res.status(200).json(updatedVideo);
}

export async function deleteVideoHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteVideo(id);
    res.status(204).send();
}
