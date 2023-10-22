const express = require("express");
const router = express.Router();

// instruction: import the book model
const Instructor = require("../models/instructor");

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Instructor.find());
  } catch (error) {
    res.status(400).send({ message: "Instructor not found" });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/:id", async (req, res) => {
  try {
    const findinstructor = await Instructor.findOne({ _id: req.params.id });
    res.status(200).send(findinstructor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup POST /: Add a new instructor
router.post("/", async (req, res) => {
  try {
    const newInstructor = new Instructor({
      name: req.body.name,
      qualification: req.body.qualification,
      profile: req.body.profile,
      coursesTaught: req.body.coursesTaught,
    });

    await newInstructor.save();
    res.status(200).send(newInstructor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id
router.put("/:id", async (req, res) => {
  try {
    const instructor_id = req.params.id;

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructor_id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).send(updatedInstructor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (req, res) => {
  try {
    const instructor_id = req.params.id;
    const deleteInstructor = await Instructor.findByIdAndDelete(instructor_id);
    res.status(200).send(deleteInstructor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: export the router
module.exports = router;
