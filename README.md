# NGINX-MANAGER

- this endpoint is intended to manage your nginx sites with a self-written frontend

## Status

- at the moment it only has an express hello world at route /api 

## Goals

- the goal for this endpoint is that you can add, edit, and manage your sites configuration with a web UI. It will be usefull for either local files o reverse proxy 
- In addition I would like to implement certbot SSL for even easier HTTPS web deployment
- I dont think that i need any database to accomplish this goals, so i'll be using and initial setup with an admin user and a encrypted password (i'll have to think if I do this via terminal or webUI)
