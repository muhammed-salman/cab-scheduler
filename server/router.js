const Authentication = require('./controllers/authentication');
const Zone = require('./controllers/zone');
const Slot = require('./controllers/slot');
const User = require('./controllers/userinfo');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/zonelist', Zone.getZoneList);
  app.post('/zoneinfo', Zone.getZoneInfo);
  app.post('/userinfo', User.getUserInfo);
  app.post('/slotinfo', Slot.getSlotInfo);
  app.post('/zoneslots', Slot.getZoneSlots);
  app.post('/slotbydatetime', Slot.getSlotByStartTimeDate);
  app.post('/userslotbydatetime', Slot.getUserSlotByStartTimeDate);
  app.post('/userslots', Slot.getUserSlots);
  app.post('/bookslot', Slot.bookSlot);
  app.post('/userwaitlist', Slot.userWaitList);
  app.post('/addtowaitlist', Slot.addToWaitList);

}
