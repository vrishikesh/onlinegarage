const Joi = require("@hapi/joi");

module.exports = [
  {
    method: "GET",
    path: "/cart",
    config: {
      handler: async function(request, h) {
        return "cart hello world";
      },
      description: "Cart Route",
      notes: "Returns a cart text",
      tags: ["api"]
    }
  },
  {
    method: "GET",
    path: "/cart/{id}",
    config: {
      handler: async function(request, h) {
        return `cart id: ${request.params.id} hello world`;
      },
      description: "Cart Route",
      notes: "Returns a cart text",
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
