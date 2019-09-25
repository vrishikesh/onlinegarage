const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const process = require("process");

const Pack = require("./package");
const Routes = require("./routes");

async function start() {
  const server = await new Hapi.server({
    host: "localhost",
    port: 3000
  });

  const swaggerOptions = {
    info: {
      title: "Online Garage Documentation",
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
    }
  ]);

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    throw err;
  }

  server.route(Routes);

  return server;
}

start()
  .then(server => {
    console.log("Server running at:", server.info.url);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
