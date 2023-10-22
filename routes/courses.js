const express = require("express");
const router = express.Router();

// instruction: import the course model
const Course = require("../models/course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Course.find().populate("instructor"));
  } catch (error) {
    res.status(400).send({ message: "Course not found" });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)
router.get("/:id", async (req, res) => {
  try {
    const data = await Course.findOne({ _id: req.params.id }).populate(
      "instructor"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Course id not found" });
  }
});

// instruction: setup POST /: Add a new course
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      instructor: req.body.instructor,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      subject: req.body.subject,
      description: req.body.description,
      enrollmentCount: req.body.enrollmentCount,
    });

    await newCourse.save();
    res.status(200).send(newCourse);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id
router.put("/:id", async (req, res) => {
  try {
    const course_id = req.params.id;

    const updatedCourse = await Course.findByIdAndUpdate(course_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`
router.delete("/:id", async (req, res) => {
  try {
    const course_id = req.params.id;
    const deleteCourse = await Course.findByIdAndDelete(course_id);
    res.status(200).send(deleteCourse);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: export the router
module.exports = router;
