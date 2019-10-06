import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import HapiAuthBasic from "@hapi/basic";
import swStats from "swagger-stats";

import Pack from "../package.json";

const swaggerOptions = {
  info: {
    title: Pack.title + " Documentation",
    version: Pack.version,
    description: Pack.description
  },
  documentationPath: "/"
};

export default [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  HapiAuthBasic,
  swStats.getHapiPlugin
];
