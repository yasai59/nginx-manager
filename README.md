# NGINX-MANAGER

- this endpoint is intended to manage your nginx sites with a self-written frontend

## Routes

### public routes
- Initial setup:
  - In order to find out if the initial setup has been made you should GET /api/setup and you will receive a respose like this:
  ```json
  {
    "setup": true | false
  }
  ```
  - For creating the initial setup you should POST /api/setup with a request body like this:
  ```json
  {
    "user": "your username",
    "password": "y0ur p4s5w0rd"
  }
  ```
  You will receive a response with a "ok": true if the setup was successfully done, note that you can only do the setup
  if you have not done it before.

- Login
  - For loggin in you'll need to send a POST to /api/login with the next body:
  ```json
  {
    "user": "your username",
    "password": "y0ur p4s5w0rd"
  }
  ```
  In response you will obtain a error if something went wrong, if not the response will look like this:
  ```json
  {
    "ok": true,
    "msg": "loginPost",
    "token": "a valid JWT token for verification"
  }
  ```
### private routes

From now on all the request need a header named x-token with the provided token at login in order to work

- Manage sites
  - GET to /api/sites (get a list of the available sites)
  ```json
  [
    {
      "uuid": "the unique uuid of the site",
      "title": "the site title",
      "url": "the access url",
      "type": "local" | "proxy"
    }
  ]
  ```
  - POST to /api/sites (submit a new site to the system) WORK IN PROGRESS
    - body
    ```json
    {
      "title": "the title of the site",
      "url": "the access url",
      "type": "local" | "proxy",
      // only for type proxy
      "ip": "ip of the server we are doing a reverse proxy",
      "port": "the port of the service"
    }
    ```
    - response
    ```json
    "ok": true | false,
    "msg": "success or error message"
    ```

## WORK ON PROGRESS

the application is still on development and will not edit any nginx configuration for now.

for now this only creates the nginx configuration file, stores it in a temporal folder and restarts nginx when a new site is submitted


## Goals

- the goal for this endpoint is that you can add, edit, and manage your sites configuration with a web UI. It will be usefull for either local files o reverse proxy 
- In addition I would like to implement certbot SSL for even easier HTTPS web deployment
- I dont think that i need any database to accomplish this goals, so i'll be using and initial setup with an admin user and a encrypted password (i'll have to think if I do this via terminal or webUI)
