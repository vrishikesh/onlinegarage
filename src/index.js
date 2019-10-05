"use strict";
// @flow

import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
// $FlowFixMe
import Process from "process";
import HapiAuthBasic from "@hapi/basic";
import swStats from "swagger-stats";

import Pack from "../package.json";
import Routes from "./routes";
import Users from "./data/users.json";

const start = async () => {
  const server = await new Hapi.server({
    host: "localhost",
    port: 3000
  });

  const swaggerOptions = {
    info: {
      title: Pack.title + " Documentation",
      version: Pack.version,
      description: Pack.description
    },
    documentationPath: "/"
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    HapiAuthBasic,
    swStats.getHapiPlugin
  ]);

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
