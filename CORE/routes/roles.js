var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res, next) {
    db.role.findAll().then(c => res.json(c));
});

router.get("/:id/:languageId", function(req, res, next) {
    db.role.findOne({
        include: [{
            model: db.menuItem,
            where: { languageId: req.params.languageId }
        }],
        where: { id: req.params.id }
    }).then(c => res.json(c));
});

router.post("/", function(req, res, next) {
    db.role.create(req.body).then(c => res.json(c));
});

router.put("/:id", function(req, res, next) {
    db.role
        .update(req.body, { where: { id: req.params.id } })
        .then(function(result) {
            if (result > 0)
                db.role
                .findAll({ where: { id: req.params.id } })
                .then(c => res.json(c));
        });
});

router.delete("/:id", function(req, res, next) {
    db.role
        .destroy({ where: { id: req.params.id } })
        .then(res.send({ id: req.params.id, response: "Deleted" }));
});
module.exports = router;