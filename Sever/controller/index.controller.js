const SinhVien = require('../model/SinhVien');

module.exports.index = (req, res) => {
    SinhVien.find({}, (err, sinhViens) => {
        res.json(sinhViens);
    });
}

module.exports.insert = (req, res) => {
    res.render('form')
}

module.exports.insertPost = (req, res) => {
    SinhVien.create({
        idStudent: req.body.mssv,
        email: req.body.email,
        name: req.body.ten,
        year: req.body.tuoi,
    }, (err, small) => {
        if (!err) {
            res.redirect('/')
        } else {

            res.send(err);
        }
    });
}