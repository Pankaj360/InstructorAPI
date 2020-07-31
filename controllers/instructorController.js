const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const Instructor = mongoose.model('Instructor');


router.get('/', (req, res) => {
    res.render("instructor/addOrEdit", {
        viewTitle: "Insert instructor"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var instructor = new Instructor();
    instructor.fullName = req.body.fullName;
    instructor.email = req.body.email;
    instructor.mobile = req.body.mobile;
    instructor.city = req.body.city;
    instructor.save((err, doc) => {
        if (!err)
            res.redirect('/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("instructor/addOrEdit", {
                    viewTitle: "Insert instructor",
                    instructor: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Instructor.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("/addOrEdit", {
                    viewTitle: 'Update instructor',
                    instructor: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Instructor.find((err, docs) => {
        if (!err) {
            res.render("instructor/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving instructor list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Instructor.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("instructor/addOrEdit", {
                viewTitle: "Update instructor",
                instructor: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Instructor.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Error in instructor delete :' + err); }
    });
});

module.exports = router;