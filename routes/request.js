const express = require('express');

const request = require('../controllers/request');

const requestRouter = express.Router();
requestRouter.use(express.json());

requestRouter
  .route('/request')
  .post(request.createReq)
  .put(request.editReq)
  .delete(request.deleteReq);

requestRouter.get('/allReqs', request.allReqs);

requestRouter.post('/acceptReq', request.acceptReq);

module.exports = requestRouter;
