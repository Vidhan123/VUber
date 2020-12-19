const Requests = require('../models/requests');

exports.createReq = async (req, res) => {
  try {
    const request = new Requests({
      pickupAddress: req.body.pU,
      dropAddress: req.body.d,
      createdBy: req.body.userId,
      time: req.body.time,
    });
    await request.save();
    res.json(request);
  } catch (err) {
    console.log(err);
  }
};

exports.editReq = async (req, res) => {
  let upadatedReq = {
    pickupAddress: req.body.pU,
    dropAddress: req.body.d,
    time: req.body.time,
  };
  upadatedReq = { $set: upadatedReq };
  try {
    const response = await Requests.update(
      { createdBy: req.body.createdBy },
      upadatedReq
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteReq = async (req, res) => {
  try {
    console.log(req.body);
    const result = await Requests.find({
      createdBy: req.body.createdBy,
    }).remove();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

exports.allReqs = async (req, res) => {
  const reqs = await Requests.find({});
  res.json(reqs);
};

exports.acceptReq = async (req, res) => {
  try {
    let upadatedReq = {
      accepted: true,
      acceptedBy: req.body.userId,
      reqStatus: 'On the way',
    };
    upadatedReq = { $set: upadatedReq };
    const response = await Requests.update(
      { createdBy: req.body.createdBy },
      upadatedReq
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
