const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id: { type: Number },
    title: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    slug: { type: String, slug: "title", unique: true },
    video: { type: String },
  },
  {
    _id: false,
    timeseries: true,
  }
);
Course.plugin(AutoIncrement);
Course.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Course", Course);
