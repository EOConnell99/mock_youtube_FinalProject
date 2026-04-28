import {
    getAllChannels,
    getChannelById,
    createChannel,
    updateChannel,
    deleteChannel,
} from '../services/channelService.js';

export async function getAllChannelsHandler(req, res) {
    /*const {
      search = '',
      sortBy = 'id',S
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
    let Channels = await getAllChannels(/*options*/);
    res.status(200).json(Channels);
}

export async function getChannelByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const Channel = await getChannelById(id);
    res.status(200).json(Channel);
}

export async function createChannelHandler(req, res) {
    const { name, desc } = req.body;
    const newChannel = await createChannel({ name, desc, user_id: req.user.id });
    res.status(201).json(newChannel);
}

export async function updateChannelHandler(req, res) {
    const id = parseInt(req.params.id);
    const { name, desc } = req.body;
    const updatedChannel = await updateChannel(id, { name, desc });
    res.status(200).json(updatedChannel);
}

export async function deleteChannelHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteChannel(id);
    res.status(204).send();
}
