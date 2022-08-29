const course = require("../models/course");
const Courses = require("../models/course");

class MeController {
  index(req, res, next) {
    let findCourse = Courses.find({});
    if (req.query.hasOwnProperty('_sort')) {
      findCourse.sort({
        [req.query._colunm]: req.query._type
      });
    }
    Promise.all([findCourse, Courses.countDocumentsDeleted()])

      .then(([courses, numberDeleted]) => {
        courses = courses.map(course => course.toObject());

        res.render("courses/list", { courses, numberDeleted });
      }).catch(next)


  }
  trash(req, res, next) {
    Courses.findDeleted({})
      .lean()
      .then((course) => {
        res.render("courses/trash", { course });
      })
      .catch(next);
  }
}

module.exports = new MeController();
