var mongoose = require('mongoose');
var moment = require('moment');
var Zone = require('./Zone');
var Slot = require('./Slot');
var Schedule = require('./Schedule');

var startDate, endDate;
function getNextWeek(){
    var date = new Date();
    var curr_date =new Date();
    var day = curr_date.getDay();
    // console.log(day);
    var diff = curr_date.getDate() - day + (day == 0 ? -6:1); // 0 for sunday
    var week_start_tstmp = curr_date.setDate(diff);

    var week_end  = new Date(week_start_tstmp);  // first day of week
    week_end = new Date (week_end.setDate(week_end.getDate() + 6));
    startDate = week_start_tstmp;
    endDate = week_end;
}

getNextWeek();

mongoose.connect('mongodb://localhost/auth');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Successfully Connected");

  var zones = ['South Mumbai','Bandra', 'Andheri', 'Navi Mumbai'];

  for(var i=0;i<zones.length;i++){
    (new Zone({name : zones[i]})).save((err,zone)=> {
      if(err)
        console.log("Cannot Save an error occured",err);
      else{
        console.log(zone.name+" Successfully Saved!");
        var start_slots=['08:00am','09:00am','10:00am','11:00am','12:00pm','01:00pm','02:00pm','03:00pm','04:00pm','05:00pm','06:00pm','07:00pm','08:00pm','09:00pm'];

        end_slots=['09:00am','10:00am','11:00am','12:00pm','01:00pm','02:00pm','03:00pm','04:00pm','05:00pm','06:00pm','07:00pm','08:00pm','09:00pm','10:00pm'];

        for(var j=0;j<7;j++){
          var day = (new Date()).getDay();

          for(i=0;i<start_slots.length;i++){

            var date =moment(new Date(startDate)).add(7-(day-1)+j, 'days').toDate();


            (new Slot({id : i,startTime: start_slots[i],endTime: end_slots[i], zone: zone._id, date: new Date(date), status: 'AG'})).save((err,slot)=> {
                if(err)
                console.log("Cannot Save an error occured",err);
                else {
                  console.log("Slot No."+i+" Successfully Saved!");
                }
              });
          }

        }
      }
    });
  }

});
