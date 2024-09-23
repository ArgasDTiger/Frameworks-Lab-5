const Student = require('../models/student');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await Student.find({});
      res.json(students);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async createStudent(req, res) {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async updateStudent(req, res) {
    try {
      const studentId = req.params.id;
      const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });

      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(updatedStudent);
    } catch (err) {
      console.error('Error updating student:', err);
      res.status(500).json({ message: "Error updating student", error: err.message });
    }
  }

  static async deleteStudent(req, res) {
    try {
      const result = await Student.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ message: "Error deleting student", error: err.message });
    }
  }
}

module.exports = StudentsController;
