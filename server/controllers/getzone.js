const Zone = require('../models/Zone');



exports.getZoneInfo = function(req, res, next) {
  const {name} = req.body;
  if (!name) {
    return res.status(422).send({ error: 'You must provide zone name'});
  }
  Zone
  .findOne({name})
  .select('_id name')
  .exec((err,data) => {
    if(err)
      return next(err);
    return res.status(200).send(data);
    });
}

exports.getZoneList = function(req, res, next) {
  Zone
  .find({})
  .select('_id name')
  .sort({name: 1})
  .exec((err,data) => {
    if(err)
      return next(err);
      return res.status(200).send(data);
    });
}
