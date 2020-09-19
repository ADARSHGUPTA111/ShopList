const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

//@route GET api/items
//@desc get All items
//@access Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//private access
//post an item
//by the auth we have protected the routes
//so now not anyone can post or delete our items
router.post(
  "/",
  /*auth,*/ (req, res) => {
    const newItem = new Item({
      name: req.body.name,
    });
    newItem.save().then((item) => res.json(item));
    // uncomment auth after resolving
  }
);

//delete an item
//private access
router.delete(
  "/:id",
  /*auth,*/ (req, res) => {
    Item.findById(req.params.id)
      .then((item) => item.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
    // uncomment auth after resolving
  }
);

module.exports = router;
