var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var AdultIncomeSchema = new mongoose.Schema({
    aid: Number
  , amount: Number
  , freq: String
  , category: String
  , pin: String});

var AdultIncome = mongoose.model('AdultIncome', AdultIncomeSchema);
router.get('/download/adultincome', function(req, res, next) {
  AdultIncome.find(function (err, row) {
    if (err) return next(err);
    res.json(row);
  });
});
router.post('/adultincome', function(req, res, next) {
    var adults = req.body;
    if (adults) {
        adults.forEach(function (v) {
            var income = v.income;
            if (income) {
                Object.keys(income).forEach(k => {
                    var a = new AdultIncome();
                    a.aid = v.aid;
                    a.pin = v.pin;
                    a.category = k;
                    a.amount = income[k].amount;
                    a.freq = income[k].freq;
                    a.save(function (err, post) {
                        if (err) return next(err);
                        //res.json(post); //no need response
                    });
                });
            }
        });
    }
    res.json({ok:true});
});
          
var AdultSchema = new mongoose.Schema({
    aid: Number
  , name: {lName: String, mName: String, fName:String}
  , has_income: Boolean
  , pin: String});
  
var Adult = mongoose.model('Adult', AdultSchema);
router.get('/download/adult', function(req, res, next) {
  Adult.find(function (err, row) {
    if (err) return next(err);
    res.json(row);
  });
});

router.post('/adult', function(req, res, next) {
    var adults = req.body;
    if (adults) {
        
        adults.forEach(function (v) {
        var a = new Adult();
        a.aid = v.aid;
        a.name = {lName: v.lName
        , mName: v.mName
        , fName: v.fName}
        a.has_income = v.has_income;
        a.pin = v.pin;
        a.save(function (err, post) {
            if (err) return next(err);
            //res.json(post);
        })});
    }
     res.json({ok:true});
});
 
var ChildSchema = new mongoose.Schema({
    cid: Number
  , name: {lName: String, mName: String, fName:String}
  , statuses: {'Foster': Boolean, 'Head Start': Boolean, 'Migrant': Boolean, 'None': Boolean, 'Runaway': Boolean}
  , is_student: Boolean
  , pin: String});
  
var Child = mongoose.model('Child', ChildSchema);
router.get('/download/child', function(req, res, next) {
  Child.find(function (err, row) {
    if (err) return next(err);
    res.json(row);
  });
});

router.post('/child', function(req, res, next) {
    var childs = req.body;
    console.log(req.body);
    if (childs) {
        
        childs.forEach(function (v) {
        var a = new Child();
        a.cid = v.cid;
        a.name = {lName: v.lName
        , mName: v.mName
        , fName: v.fName}
        a.statuses = v.statuses;
        a.is_student = v.isStudent;
        a.pin = v.pin;
        a.save(function (err, post) {
            if (err) return next(err);
           // res.json(post);
        })});
    }
     res.json({ok:true});
});

var ChildIncomeSchema = new mongoose.Schema({
    cid: Number
  , category: String
  , amount: Number
  , freq: String
  , pin: String});

var ChildIncome = mongoose.model('ChildIncome', ChildIncomeSchema);
router.get('/download/childincome', function(req, res, next) {
  ChildIncome.find(function (err, row) {
    if (err) return next(err);
    res.json(row);
  });
});
router.post('/childincome', function(req, res, next) {
    console.log(req.body);
    var child = req.body;
    if (child) {
        child.forEach(function (v) {
            var income = v.income;
            if (income) {
                Object.keys(income).forEach(k => {
                    var a = new ChildIncome();
                    a.aid = v.aid;
                    a.pin = v.pin;
                    a.category = k;
                    a.amount = income[k].amount;
                    a.freq = income[k].freq;
                    a.save(function (err, post) {
                        if (err) return next(err);
                        //res.json(post); //no need response
                    });
                });
            }
        });
    }
    res.json({ok:true});
});


var AssistanceSchema = new mongoose.Schema({
    case_number: String
  , has_program: Boolean
  , program_name: String
  , pin: String});

var Assistance = mongoose.model('Assistance', AssistanceSchema);
router.get('/download/assistance', function(req, res, next) {
  Assistance.find(function (err, row) {
    if (err) return next(err);
    res.json(row);
  });
});
router.post('/assistance', function(req, res, next) {
    var a = new Assistance();
    a.case_number = req.body.caseNumber;
    a.has_program = req.body.has_program;
    a.program_name = req.body.programName;
    a.pin = req.body.pin;
    a.save(function (err, post) {
    if (err) return next(err);
    res.json(post);
  })});
    
var SignerSchema = new mongoose.Schema({
  address: {address1: String, address2: String, city: String, state: String, zip: String}
  , datesigned: String
  , name: {lName: String, mName: String, fName:String}
  , races: {'Hispanic/Latino': Boolean, 'Asian': Boolean, 'White': Boolean, 'African American':Boolean, 'Others':Boolean, 'None':Boolean}
  , signature: String
  , ssn: String
  , email: String
  , pin: String});

var Signer = mongoose.model('Signer', SignerSchema);
router.get('/download/signer', function(req, res, next) {
  Signer.find(function (err, row) {
    if (err) return next(err);
    res.json(row);
  });
});
router.post('/signer', function(req, res, next) {
    var s = new Signer();
    s.datesigned = req.body.datesigned;
    s.name = req.body.name;
    s.signature = req.body.signature;
    s.races = req.body.races;
    s.ssn = req.body.ssn;
    s.pin = req.body.pin;
    s.email = req.body.email;
    s.address = req.body.address;
    s.save(function (err, post) {
    if (err) return next(err);
    res.json(post);
  })});



module.exports = router;
