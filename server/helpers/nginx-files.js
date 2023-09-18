const fs = require("fs");

handleProxy = (url, ip, port) => {
  const schema = fs.readFileSync("./server/schemes/nginx_proxy.conf");

  const result = schema
    .toString()
    .replace(/{DOMINIO}/gi, url)
    .replace(/{IP}/gi, ip)
    .replace(/{PUERTO}/gi, port);

  if (process.env.ENVIRONMENT === "prod") {
    fs.writeFileSync(`/etc/nginx/sites-available/${url}.conf`, result);
    fs.symlinkSync(
      `/etc/nginx/sites-available/${url}.conf`,
      `/etc/nginx/sites-enabled/${url}.conf`
    );
  } else {
    fs.writeFileSync(`./files/tmp/${url}.conf`, result);
  }
};
handleLocal = (url) => {
  // read the schema file
  const schema = fs.readFileSync("./server/schemes/nginx_local.conf");
  // create the configuration file
  const result = schema.toString().replace(/{DOMINIO}/gi, url);

  // save the configuration file
  if (process.env.ENVIRONMENT === "prod") {
    fs.writeFileSync(`/etc/nginx/sites-available/${url}.conf`, result);
    fs.symlinkSync(
      `/etc/nginx/sites-available/${url}.conf`,
      `/etc/nginx/sites-enabled/${url}.conf`
    );
  } else {
    fs.writeFileSync(`./files/tmp/${url}.conf`, result);
  }
};

const handleDelete = (url) => {
  if (process.env.ENVIRONMENT === "prod") {
    fs.unlinkSync(`/etc/nginx/sites-available/${url}.conf`);
    fs.unlinkSync(`/etc/nginx/sites-enabled/${url}.conf`);
  } else {
    fs.unlinkSync(`./files/tmp/${url}.conf`);
  }
};

const handleUpdateLocal = (url, oldUrl) => {
  handleDelete(oldUrl);
  handleLocal(url);
};

const handleUpdateProxy = (url, ip, port, oldUrl) => {
  handleDelete(oldUrl);
  handleProxy(url, ip, port);
};

const file = ({ url, type, ip, port, action, oldUrl }) => {
  if (action === "delete") {
    handleDelete(url);
    return;
  }

  if (action === "update") {
    switch (type) {
      case "proxy":
        handleUpdateProxy(url, ip, port, oldUrl);
        break;
      case "local":
        handleUpdateLocal(url, oldUrl);
        break;
      default:
        break;
    }
    return;
  }
  switch (type) {
    case "proxy":
      handleProxy(url, ip, port);
      break;
    case "local":
      handleLocal(url);
      break;
    default:
      break;
  }
};

module.exports = {
  file,
};
