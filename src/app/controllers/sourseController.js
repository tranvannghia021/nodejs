const Courses = require("../models/course");

class sourseController {
  show(req, res, next) {
    const slug = req.params.slug;
    Courses.findOne({ slug: slug })
      .lean()
      .then((sourse) => {
        res.render("courses/show", { sourse });
      })
      .catch(next);
  }

  create(req, res, next) {
    res.render("courses/create");
  }
  store(req, res, next) {

    req.body.image = `https://i.ytimg.com/vi/${req.body.video}/hqdefault.jpg`;
    const course = new Courses(req.body);
    course
      .save()
      .then(() => {
        res.redirect("/me/courses");
      })
      .catch(() => {
        res.redirect("courses/create");
      });
  }
  edit(req, res, next) {
    const id_course = req.params.id;
    Courses.findById(id_course)
      .lean()
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch(next);
  }
  update(req, res, next) {
    const id_course = req.params.id;
    const FormData = req.body;
    FormData.image = `https://i.ytimg.com/vi/${req.body.video}/hqdefault.jpg`;
    Courses.findByIdAndUpdate(id_course, FormData)
      .lean()
      .then((course) => {
        res.redirect("/");
      })
      .catch(() => {
        res.redirect("courses/create");
      });
  }
  restore(req, res, next) {
    const id_course = req.params.id;
    Courses.restore({ _id: id_course })
      .then((result) => {
        res.redirect("back");
      })
      .catch(next);
  }
  restoreCheckbox(req, res, next) {

    switch (req.body.action) {
      case 'forget':
        Courses.deleteOne({ _id: { $in: req.body.idCourse } })
          .then((result) => {
            res.redirect("back");
          })
          .catch(next);
        break;

      case 'restore':
        Courses.restore({ _id: { $in: req.body.idCourse } })
          .then((result) => {
            res.redirect("back");
          })
          .catch(next);
        break;
      default: res.status(200).json('method not found');
    }

  }
  destroy(req, res, next) {
    const id_course = req.params.id;
    Courses.delete({ _id: id_course })
      .then((result) => {
        res.redirect("/me/courses");
      })
      .catch(next);
  }
  forget(req, res, next) {

    switch (req.body.action) {
      case 'delete':
        Courses.delete({ _id: { $in: req.body.idCourse } })
          .then((result) => {
            res.redirect("back");
          })
          .catch(next);
        break;
      default: res.status(200).json('method not found');
    }

  }
}

module.exports = new sourseController();
