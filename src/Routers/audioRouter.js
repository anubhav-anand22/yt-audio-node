const express = require('express');
const { audioProviderFn } = require('../helpers/audioProviderFn');
const { getVideoInfoFromId } = require('../helpers/getVideoInfoFromId');
const { getVideoInfoFormPlaylitById } = require('../helpers/getVideoInfoFormPlaylitById');

const router = express.Router();

router.get('/api/audio/:id', audioProviderFn);

router.get('/api/video-info/:id', getVideoInfoFromId);

router.get('/api/video-from-list/:id', getVideoInfoFormPlaylitById);

module.exports = {
    audioRouter: router
}