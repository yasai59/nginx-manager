const fs = require("fs");
const { file } = require("../helpers/nginx-files");

const sitesGet = (req, res) => {
  const sites = JSON.parse(fs.readFileSync("./files/sites.json"));

  res.json(sites);
};

const sitesPost = (req, res) => {
  const { v4: uuidv4 } = require("uuid");
  const { exec } = require("child_process");
  // read the site details from the request body
  const { title, url, type } = req.body;

  /* 
TODO: we actually need to create the nginx file and save it to the proper location before adding the site to the sites.json file
  */

  // handle nginx config file creation
  if (type === "proxy") {
    const { ip, port } = req.body;
    if (!ip || !port) {
      return res.status(400).json({
        ok: false,
        msg: "The ip and port are required for proxy sites",
      });
    }
    file({
      url,
      type,
      ip,
      port,
    });
  } else {
    file({
      url,
      type,
    });
  }

  // handle nginx config file saving

  // handle nginx config file linking
  // handle nginx reloading
  exec("service nginx restart");

  // read the sites file and add the new site to it
  let sites;
  try {
    sites = JSON.parse(fs.readFileSync("./files/sites.json"));
  } catch (e) {
    sites = [];
  }

  const newSite = {
    id: uuidv4(),
    title,
    url,
    type,
  };

  // look if we have a site with the same url or title
  const siteExists = sites.find(
    (site) => site.url === url || site.title === title
  );

  if (siteExists) {
    return res.status(400).json({
      ok: false,
      msg: "A site with the same title or url already exists",
    });
  }

  sites.push(newSite);
  // wirte the sites file with the new site
  fs.writeFileSync("./files/sites.json", JSON.stringify(sites));

  res.json({
    ok: true,
    msg: "sitesPost",
  });
};

const sitesDelete = (req, res) => {
  const { uuid } = req.body;

  /*
TODO: we actually need to delete the nginx file and unlink it before deleting the site from the sites.json file
  */

  // read the sites file
  let sites;
  try {
    sites = JSON.parse(fs.readFileSync("./files/sites.json"));
  } catch (e) {
    return res.status(400).json({
      ok: false,
      msg: "There are no sites to delete",
    });
  }

  // look if we have a site with the same uuid
  const siteExists = sites.find((site) => site.id === uuid);
  if (!siteExists) {
    return res.status(400).json({
      ok: false,
      msg: "There are no sites to delet",
    });
  }

  sites = sites.filter((site) => site.id !== uuid);

  // wirte the sites file without the deleted site
  fs.writeFileSync("./files/sites.json", JSON.stringify(sites));

  res.json({
    ok: true,
    msg: "sitesDelete",
  });
};

module.exports = {
  sitesGet,
  sitesPost,
  sitesDelete,
};
