const User = require('../models/user');
const Zone = require('../models/Zone');
const Schedule = require('../models/Schedule');
const Slot = require('../models/Slot');
const config = require('../config');



exports.getSlotInfo = function(req, res, next) {
  const {id} = req.body;
  if (!id) {
    return res.status(422).send({ error: 'You must provide slot unique id'});
  }
  Slot
  .findById(id)
  .exec((err,data) => {
    if(err)
      return next(err);
    return res.status(200).send(data);
    });
}

exports.getZoneSlots = function(req, res, next) {

  const {name} = req.body;
  Zone
  .findOne({name})
  .select('_id')
  .exec((err,data) => {
    if(err)
      return next(err);
    Slot
    .find({zone : data._id})
    .sort({id: 1})
    .exec((err,slots) => {
      if(err)
        return next(err);
      return res.status(200).send(slots);
    });
  });
}
