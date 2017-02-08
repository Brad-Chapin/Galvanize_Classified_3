
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get("/", (req, res, next) => {
  knex("classifieds")
  // .select("id", "title", "description", "price", "item_image").from("classifieds")
  .then((classifieds) => {
    res.send(classifieds);
  })
  .catch((error) => {
    next(err);
  })
});


router.get("/:id", (req, res, next) => {
  knex("classifieds")
  .where("id", req.params.id)
  .first()
  // .select("id", "title", "description", "price", "item_image").from("classifieds")
  .then((classifieds) => {
    if (!classifieds) {
      return next ();
    }
    return res.send(classifieds);
  })
  .catch((err) => {
    next(err);
  });
});

router.post("/", (req, res, next) => {
  knex("classifieds")
  .insert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  }, "*")
  // .select("id", "title", "description", "price", "item_image").from("classifieds")
  .then((classifieds) => {
    delete classifieds[0].created_at;
    delete classifieds[0].updated_at;
    return res.send(classifieds[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch("/:id", (req, res, next) => {
  knex("classifieds")
  .where("id", req.params.id)
  .first()
  .then((classifieds) => {
    if (!classifieds){
      return next();
    }
    return knex("classifieds")
    .update ({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }, "*")
    .where("id", req.params.id)
  })
  .then((classifieds) => {
    // delete classifieds[0].created_at;
    // delete classifieds[0].updated_at;
    res.send(classifieds[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.delete("/:id", (req, res, next) => {
  let classifieds;
  knex("classifieds")
  .where("id", req.params.id)
  .first()
  .then((row) => {
    if (!row) {
      return next();
    }
    classifieds = row;
    knex ("classifieds")
    .del()
    .where("id", req.params.id)
    .then((row) => {
      // delete classifieds.created_at;
      // delete classifieds.updated_at;
      res.json(classifieds);
    })
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
