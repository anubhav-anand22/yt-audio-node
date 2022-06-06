const express = require('express');
const { audioProviderFn } = require('../helpers/audioProviderFn');
const { getVideoInfoFromId } = require('../helpers/getVideoInfoFromId');
const { getVideoInfoFormPlaylitById } = require('../helpers/getVideoInfoFormPlaylitById');
const {getImgLinkFromListId} = require('../helpers/getImgLinkFromListId');

const router = express.Router();

router.get('/api/audio/:id', audioProviderFn);

router.get('/api/video-info/:id', getVideoInfoFromId);

router.get('/api/video-from-list/:id', getVideoInfoFormPlaylitById);

router.get('/api/get-img-link-from-playlist-id/:id', getImgLinkFromListId)

module.exports = {
    audioRouter: router
}