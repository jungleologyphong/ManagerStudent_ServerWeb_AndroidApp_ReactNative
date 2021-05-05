const students = require("../model/Student");

exports.homeRoutes = (req, res) => {
  students.find({}).then(response => {
        res.render('dashboard',{studentsList : response});
    })
      .catch(err =>{
        res.send(err);
    })
}

exports.chart = (req, res) => {

  students.find({}).then(response => {
    var ltmt = 0;
    var qtks = 0;;
    var mkt = 0;
    var hdvdl = 0;
    var tcsk = 0;
    for (var i = 0; i < response.length; i++) {
        if (response[i].careerStudent === "LTMT") {
            ltmt++;
        } else if (response[i].careerStudent === "QTKS") {
            qtks++;
        } else if (response[i].careerStudent === "Marketting") {
            mkt++;
        } else if (response[i].careerStudent === "Du Lịch") {
            hdvdl++;
        } else if (response[i].careerStudent === "PR & Event") {
            tcsk++;
        }
        console.log(ltmt);
    }
      res.render('dashboard',{ltmt : ltmt, qtks : qtks, mkt : mkt, hdvdl : hdvdl, tcsk : tcsk});
    })
    .catch(err =>{
      res.send(err);
  })
}

exports.update_user = (req, res) =>{
  students.findOne({_id : req.query.id}).then(response => {
    res.render('updateProduct',{studentsList : response});
  })
  .catch(err =>{
    res.send(err);
})
   
}
exports.delete = (req, res)=>{

  students.findByIdAndDelete( req.query.id)
      .then(data => {
          if(!data){
              alert
              res.status(404).send({ message : `Cannot Delete with id ${req.query.id}. Maybe id is wrong`})
          }else{
            res.redirect('/dashboard');    
          } 
      })
      .catch(err =>{
          res.status(500).send({
              message: "Could not delete User with id=" + req.query.id
          });
      });
}
