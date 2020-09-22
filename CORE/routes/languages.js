var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res, next) {
    db.language.findAll().then(c => res.json(c));
});

router.get("/active", function(req, res, next) {
    db.language.findAll({ where: { active: true } }).then(c => res.json(c));
});

router.get("/:id", function(req, res, next) {
    var attributes = ["id", "name", "active", "icon", "iconColor"];
    db.language.findAll({ attributes, where: { id: req.params.id } }).then(c => res.json(c));
});

router.post("/", function(req, res, next) {
    db.language.create(req.body).then(c => res.json(c));
});

router.put("/:id", function(req, res, next) {
    db.language
        .update(req.body, { where: { id: req.params.id } })
        .then(function(result) {
            if (result > 0)
                db.language
                .findAll({ where: { id: req.params.id } })
                .then(c => res.json(c));
        });
});

router.delete("/:id", function(req, res, next) {
    db.language
        .destroy({ where: { id: req.params.id } })
        .then(res.send({ id: req.params.id, response: "Deleted" }));
});
module.exports = router;