const Joi = require("@hapi/joi");

module.exports = [
  {
    method: "GET",
    path: "/users",
    options: {
      handler: async function(request, h) {
        return "users hello world";
      },
      description: "Users Route",
      notes: "Returns a user text",
      tags: ["api"]
    }
  },
  {
    method: "GET",
    path: "/users/{id}",
    options: {
      handler: async function(request, h) {
        return `user id: ${request.params.id} hello world`;
      },
      description: "Users Route",
      notes: "Returns a user text",
      tags: ["api"],
      validate: {
        params: Joi.object().keys({
          id: Joi.number()
            .required()
            .description("the id of something")
        })
      }
    }
  }
];
