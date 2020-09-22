var express = require("express");
var router = express.Router();
const auth = require("../middleware/check-auth");
const bcrypt = require("bcrypt");
var db = require("../models");
const jwt = require('jsonwebtoken');

router.get("/", function(req, res, next) {
    // try {
    //     if (req.userData.roleId === 1) db.user.findAll().then(c => res.json(c));
    //     else return res.status(401).json({ message: 'Auth failed. Access denied' });
    // } catch (error) {
    //     return res.status(401).json({ message: 'Auth failed. Invalid token.' });
    // }
    db.user.findAll().then(c => res.json(c));
});

router.get("/:id", function(req, res, next) {
    db.user.findOne({ where: { id: req.params.id } }).then(c => res.json(c));
});

router.post("/", async(req, res, next) => {
    let user = await db.user.findAll({ attributes: ['id'], where: { email: req.body.email } });
    if (user.length > 0) return res.json({ "status": false, "response": "You are already registered user." })
    else {
        let newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: 2,
            mobile: req.body.mobile,
            password: await bcrypt.hash(req.body.password, 10)
        };
        let r = await db.user.create(newUser);
        let token = jwt.sign({ id: r.email, password: r.password, roleId: r.roleId }, "Karthikeyan Subbarayan Ramalingam");
        return res.json({ "status": true, "token": token, "userData": { id: r.id, firstName: r.firstName, lastName: r.lastName, roleId: r.roleId, email: r.email, mobile: r.mobile } });
    }
});

router.post("/authenticate", async(req, res, next) => {
    let r = await db.user.findOne({ where: { email: req.body.email } });
    if (r != null) {
        let result = await bcrypt.compare(req.body.password, r.password);
        if (result) {
            let token = jwt.sign({ id: r.email, password: r.password, roleId: r.roleId }, "Karthikeyan Subbarayan Ramalingam");
            return res.json({ "status": true, "token": token, "userData": { id: r.id, firstName: r.firstName, lastName: r.lastName, roleId: r.roleId, email: r.email, mobile: r.mobile } });
        } else res.json({ "status": false, "response": "Entered password is Incorrect." });
    } else res.json({ "status": false, "response": "You are not registered user." });
});

router.put("/:id", function(req, res, next) {
    db.user
        .update(req.body, { where: { id: req.params.id } })
        .then(function(result) {
            if (result > 0)
                db.user
                .findAll({ where: { id: req.params.id } })
                .then(c => res.json(c));
        });
});

router.delete("/:id", function(req, res, next) {
    db.user
        .destroy({ where: { id: req.params.id } })
        .then(res.send({ id: req.params.id, response: "Deleted" }));
});
module.exports = router;