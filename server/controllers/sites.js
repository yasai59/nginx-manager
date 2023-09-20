const fs = require("fs");
const { file } = require("../helpers/nginx-files");
const { exec } = require("child_process");

const sitesGet = (req, res) => {
  let sites;
  try {
    sites = JSON.parse(fs.readFileSync("./files/sites.json"));
  } catch (e) {
    sites = [];
  }

  res.json(sites);
};

const sitesPost = (req, res) => {
  const { v4: uuidv4 } = require("uuid");
  // read the site details from the request body
  const { title, url, type } = req.body;

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
  const { id } = req.body;

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
  const siteExists = sites.find((site) => site.id === id);
  if (!siteExists) {
    return res.status(400).json({
      ok: false,
      msg: "There are no sites to delet",
    });
  }
  // wirte the sites file without the deleted site
  sites = sites.filter((site) => site.id !== id);
  fs.writeFileSync("./files/sites.json", JSON.stringify(sites));
  // we manage the deletion of the file
  const url = siteExists.url;
  try {
    file({
      url,
      action: "delete",
    });
  } catch (e) {
    console.log("Error deleting file");
  }

  exec("service nginx restart");

  res.json({
    ok: true,
    msg: "sitesDelete",
  });
};

// update a site
const sitesPut = (req, res) => {
  const { uuid } = req.body;
  const { title, url, ip, port } = req.body;

  let sites;

  try {
    sites = JSON.parse(fs.readFileSync("./files/sites.json"));
  } catch (e) {
    return res.status(400).json({
      ok: false,
      msg: "There are no sites to update",
    });
  }

  // look if we have a site with the same uuid
  const site = sites.find((site) => site.id === uuid);
  if (!site) {
    return res.status(400).json({
      ok: false,
      msg: "There are no sites to update",
    });
  }

  if (url) {
    if (site.url !== url) {
      file({
        url,
        uuid,
        type: site.type,
        ip,
        port,
        action: "update",
        oldUrl: site.url,
      });
    }
  }

  if (title) {
    sites.map((site) => {
      if (site.id === uuid) {
        site.title = title;
        if (url) {
          site.url = url;
        }
      }
      return site;
    });
  }

  // wirte the sites file with the updated site
  fs.writeFileSync("./files/sites.json", JSON.stringify(sites));
  exec("service nginx restart");

  res.json({
    ok: true,
    msg: "sitesPut",
  });
};

module.exports = {
  sitesGet,
  sitesPost,
  sitesDelete,
  sitesPut,
};
