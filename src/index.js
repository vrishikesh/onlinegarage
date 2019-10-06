"use strict";
// @flow

import Hapi from "@hapi/hapi";
// $FlowFixMe
import Process from "process";

import Plugins from "./plugins";
import Routes from "./routes";
import Users from "./data/users.json";

const start = async () => {
  const server = await new Hapi.server({
    host: "localhost",
    port: 3000
  });

  await server.register(Plugins);

  await server.auth.strategy("restricted", "basic", {
    validate: async (request, username, password) => {
      const user = Users[username];
      if (!user) {
        return { isValid: false };
      }

      if (password != user.password) {
        return { isValid: false };
      }

      return { isValid: true, credentials: user };
    }
  });

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    throw err;
  }

  server.route(Routes);

  server.route({
    method: "GET",
    path: "/restricted",
    options: {
      auth: "restricted"
    },
    handler: async (request, h) => {
      return request.auth.credentials.username + " restricted";
    }
  });

  return server;
};

start()
  .then(server => {
    console.log("Server running at:", server.info.uri);
  })
  .catch(err => {
    console.log(err);
    Process.exit(1);
  });
