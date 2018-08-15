const User = require('../models/user');

exports.getUserInfo = function(req, res, next) {
  const {email} = req.body;
  console.log(req.body);
  if (!email) {
    return res.status(422).send({ error: 'You must provide user email'});
  }
  User
  .findOne({email})
  .select('_id email')
  .exec((err,data) => {
    if(err)
      return next(err);
    return res.status(200).send(data);
    });
};
