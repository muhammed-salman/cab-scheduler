var mongoose = require('mongoose');
var moment = require('moment');
var Zone = require('../models/Zone');
var Slot = require('../models/Slot');
var Schedule = require('../models/Schedule');

var startDate;
function getNextWeek(){
  var date = new Date();
  var curr_date =new Date();
  var day = curr_date.getDay();
  // console.log(day);
  var diff = curr_date.getDate() - day + (day == 0 ? -6:1); // 0 for sunday
  var week_start_tstmp = curr_date.setDate(diff);
  var week_start = new Date(week_start_tstmp);
  var week_start_date =moment(week_start).add(6, 'days');
  startDate = week_start_date;
}

getNextWeek();

console.log(startDate);

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
          // console.log(startDate);
          var date =startDate.add(1, 'days').format("YYYY-MM-DD");
          // console.log(date);
          var id=0;
          for(i=0;i<start_slots.length;i++){

            (new Slot({id : id,startTime: start_slots[i],endTime: end_slots[i], zone: zone._id, date: date, status: 'AG'})).save((err,slot)=> {
                if(err)
                console.log("Cannot Save an error occured",err);
                else {
                  console.log("Slot No."+i+" Successfully Saved!");
                }
              });

              id++;
          }

        }
        startDate = startDate.add(-7,'days');
      }
    });
  }

});
