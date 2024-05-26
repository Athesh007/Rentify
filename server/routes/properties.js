const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");

// Create Property
router.post("/", auth, async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } =
    req.body;

  try {
    const newProperty = new Property({
      sellerId: req.user.id,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get All Properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get Property By ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update Property
router.put("/:id", auth, async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } =
    req.body;

  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    if (property.sellerId.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    property.place = place || property.place;
    property.area = area || property.area;
    property.bedrooms = bedrooms || property.bedrooms;
    property.bathrooms = bathrooms || property.bathrooms;
    property.nearbyHospitals = nearbyHospitals || property.nearbyHospitals;
    property.nearbyColleges = nearbyColleges || property.nearbyColleges;

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete Property
router.delete("/:id", auth, async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    if (property.sellerId.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await property.remove();
    res.json({ msg: "Property removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Like Property
router.put("/like/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    property.likes++;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
