# NGINX-MANAGER

- this endpoint is intended to manage your nginx sites with a self-written frontend

## Routes

### public routes
- Initial setup:
  - In order to find out if the initial setup has been made you should GET /api/setup and you will receive a respose like this:
  ```js
  {
    "setup": true || false
  }
  ```
  - For creating the initial setup you should POST /api/setup with a request body like this:
  ```js
  {
    "user": "your username",
    "password": "y0ur p4s5w0rd"
  }
  ```
  You will receive a response with a "ok": true if the setup was successfully done, note that you can only do the setup
  if you have not done it before.

- Login
  - For loggin in you'll need to send a POST to /api/login with the next body:
  ```js
  {
    "user": "your username",
    "password": "y0ur p4s5w0rd"
  }
  ```
  In response you will obtain a error if something went wrong, if not the response will look like this:
  ```js
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
  ```js
  [
    {
      "id": "the unique id of the site",
      "title": "the site title",
      "url": "the access url",
      "type": "local" || "proxy"
    }
  ]
  ```
  - POST to /api/sites (submit a new site to the system)
    - body
    ```js
    {
      "title": "the title of the site",
      "url": "the access url",
      "type": "local" || "proxy",
      // only for type proxy
      "ip": "ip of the server we are doing a reverse proxy",
      "port": "the port of the service"
    }
    ```
    - response
    ```js
    {
    "ok": true || false,
    "msg": "success or error message"
    }
    ```
  - PUT to /api/sites (edit a site)
    - body
    ```js
    {
      "id": "the site id",
      // the next properties are not mandatory, only send the ones you wanna change
      "title": "the title of the site",
      "url": "the access url",
      "type": "local" || "proxy",
      "ip": "ip of the server we are doing a reverse proxy",
      "port": "the port of the service"
    }
    ```
    - response
    ```js
    {
    "ok": true || false,
    "msg": "success or error message"
    }
    ```
  - DELETE to /api/sites (delete a site)
    - body
    ```js
    {
      "id": "the site id",
    }
    ``` 
    - response
    ```js
    {
    "ok": true || false,
    "msg": "success or error message"
    }
    ```

## WORK IN PROGRESS

The application now can create, edit and delete nginx configuration files, these files will be stored in the files/tmp folder in dev mode,
in prod mode it will work properly.

There is not any https support at the moment.

Now i'm working in making posible to upload the static pages files.

The next step after making upload posible, will be support for php webpages


## Goals

- the goal for this endpoint is that you can add, edit, and manage your sites configuration with a web UI. It will be usefull for either local files o reverse proxy 
- In addition I would like to implement certbot SSL for even easier HTTPS web deployment