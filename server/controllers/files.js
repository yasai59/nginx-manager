const { request, response } = require("express");

const filesPost = (req = request, res = response) => {
  // TODO: get the url of the selected site

  // TODO: make the directory if there is'nt

  // TODO: delete old files if there are

  // TODO: put the files in the correct folder

  res.json({
    ok: true,
    msg: "filesPost",
  });
};

const filesDelete = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "filesDelete",
  });
};

module.exports = {
  filesPost,
  filesDelete,
};
