const User = require('../models/user');
const Zone = require('../models/Zone');
const Slot = require('../models/Slot');
var mongoose = require('mongoose');

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

  const {name, date} = req.body;
  Zone
  .findOne({name})
  .select('_id')
  .exec((err,data) => {
    if(err)
      return next(err);
    Slot
    .find({zone : data._id, date})
    .sort({id: 1})
    .exec((err,slots) => {
      if(err)
        return next(err);
      console.log(slots);
      return res.status(200).send(slots);
    });
  });
}


exports.getSlotByStartTimeDate = function(req, res, next) {

  const {name, startTime, date} = req.body;

  Zone
  .findOne({name})
  .select('_id')
  .exec((err,data) => {
    if(err)
      return next(err);
    Slot
      .find({zone : data._id, startTime, date})
      .exec((err,slot) => {
        if(err)
          return next(err);
        return res.status(200).send(slot);
      });
  });
}

exports.getUserSlotByStartTimeDate = function(req, res, next) {

  const {id, startTime, date} = req.body;
  Slot
  .find({user: mongoose.Types.ObjectId(id), startTime, date})
  .exec((err,slot) => {
    if(err)
    return next(err);
    return res.status(200).send(slot);
  });
}

exports.getUserSlots = function(req, res, next) {

  const {id, date} = req.body;

  Slot
    .find({user: mongoose.Types.ObjectId(id), date})
    .sort({id: 1})
    .exec((err,slots) => {
      if(err)
        return next(err);
      return res.status(200).send(slots);
    });
}

exports.bookSlot = function(req, res, next) {

  const {id, user, status} = req.body;

  Slot
    .findByIdAndUpdate(id,{status, user: mongoose.Types.ObjectId(user)},{new: true})
    .exec((err,slot) => {
      if(err)
        return next(err);
      return res.status(200).send(slot);
    });
}

exports.userWaitList = function(req, res, next) {
  const {user, date} = req.body;
  Slot
    .find({date, waitlist: { user: mongoose.Types.ObjectId(user)} })
    .sort({id: 1})
    .exec((err,slot) => {
      if(err)
        return next(err);
      return res.status(200).send(slot);
    });
}


exports.addToWaitList = function(req, res, next) {

  const {id, user} = req.body;

  Slot
    .findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
        user: {$ne: mongoose.Types.ObjectId(user)}
      },
      {$addToSet:
        {"waitlist": {user : mongoose.Types.ObjectId(user)}}
      },
      {new: true})
    .exec((err,slot) => {
      if(err)
        return next(err);
      return res.status(200).send(slot);
    });
}
