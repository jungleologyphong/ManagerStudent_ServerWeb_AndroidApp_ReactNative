var express = require('express');
var router = express.Router();
const students = require("../model/Student");
const services = require('../services/render');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', services.homeRoutes);

router.get('/dashboard', services.chart);

router.get('/dashboard', services.homeRoutes);
router.get('/updateProduct', services.update_user);
router.get('/deleteProduct', services.delete);
router.post('/updateProduct/submit',function(req, res) {
        var nameStudentIn = req.body.nameStudentInput;
        var codeStudentIn = req.body.codeStudentInput;
        var careerStudentIn = req.body.careerStudentInput;
        var dateOfBirthStudentIn = req.body.dateOfBirthStudentInput;
        students.findByIdAndUpdate(req.body.idInput, { $set: { nameStudent: nameStudentIn, codeStudent: codeStudentIn, careerStudent: careerStudentIn, dateOfBirthStudent : dateOfBirthStudentIn}},
            function(err, result) {
               if (err) {
                    console.log(err);
               } else {    
                    res.redirect('/dashboard');          
               }
           });  
    });

module.exports = router;
