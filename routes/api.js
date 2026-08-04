const express = require("express");
const router = express.Router();

const agendaEdu = require("../services/agendaEdu");
const studyHub = require("../services/barbosaStudyHub");

router.get("/assignments/:pageIndex", agendaEdu.getAssignments);

router.get("/assignment/:assignmentId", agendaEdu.getAssignment);

router.get("/classschedule", studyHub.getClassSchedule);

module.exports = router;