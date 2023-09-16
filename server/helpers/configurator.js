require("dotenv").config();

const configure = () => {
  const acceptedEnvironments = ["dev", "prod"];
  // configure the environment
  if (!acceptedEnvironments.includes(process.env.ENVIRONMENT)) {
    process.env.ENVIRONMENT = "dev";
  }
  // configure the port
  process.env.PORT = process.env.PORT || 3000;

  // configure the nginx paths that we need
  process.env.NGINX_SITES_PATH =
    process.env.NGINX_SITES_PATH || "/etc/nginx/sites-enabled/";

  process.env.NGINX_SITES_AVAILABLE_PATH =
    process.env.NGINX_SITES_AVAILABLE_PATH || "/etc/nginx/sites-available/";
};

module.exports = { configure };
