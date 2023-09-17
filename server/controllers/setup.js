const setupGet = (req, res) => {
  res.json({
    ok: true,
    msg: "Setup",
  });
};

const setupPost = (req, res) => {
  res.json({
    ok: true,
    msg: "Setup",
  });
};

module.exports = {
  setupGet,
  setupPost,
};
