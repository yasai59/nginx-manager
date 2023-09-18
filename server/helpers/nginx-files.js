const fs = require("fs");

handleProxy = (url, ip, port) => {
  const schema = fs.readFileSync("./schemes/nginx_proxy.conf");

  const result = schema
    .toString()
    .replace(/{DOMINIO}/gi, url)
    .replace(/{IP}/gi, ip)
    .replace(/{PORT}/gi, port);

  fs.writeFileSync(`./files/tmp/${url}.conf`, result);
};
handleLocal = (url) => {
  // read the schema file
  const schema = fs.readFileSync("./server/schemes/nginx_local.conf");
  // create the configuration file
  const result = schema.toString().replace(/{DOMINIO}/gi, url);

  // save the configuration file
  fs.writeFileSync(`./files/tmp/${url}.conf`, result);
};

handleDelete = (url) => {
  fs.unlinkSync(`./files/tmp/${url}.conf`);
};

const file = ({ url, type, ip, port, action }) => {
  if (action === "delete") {
    handleDelete(url);
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
