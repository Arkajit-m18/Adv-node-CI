jest.setTimeout(60000);

require("../models/User");
const mongoose = require("mongoose");

const keys = require("../config/keys");

mongoose.promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
