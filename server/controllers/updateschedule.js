const User = require('../models/user');
const Zone = require('../models/Zone');
const Schedule = require('../models/Schedule');
const Slot = require('../models/Slot');
const config = require('../config');



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
  console.log(req);
  // const {name} = req.body.name;

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
//
// exports.getZoneList = function(req, res, next) {
//
//
//   // See if a user with the given email exists
//   User.findOne({ email: email }, function(err, ) {
//     if (err) { return next(err); }
//
//     // If a user with email does exist, return an error
//     if (existingUser) {
//       return res.status(422).send({ error: 'Email is in use' });
//     }
//
//     // If a user with email does NOT exist, create and save user record
//     const user = new User({
//       email: email,
//       password: password
//     });
//
//     user.save(function(err) {
//       if (err) { return next(err); }
//
//       // Repond to request indicating the user was created
//       res.json({ token: tokenForUser(user) });
//     });
//   });
// }
