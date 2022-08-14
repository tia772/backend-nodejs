const messages = require("../config/messages.config");

module.exports = (req, res) => {
  switch (req.method) {
    case "GET":
      let responseObject;

      if (req.result) {
        responseObject = messages.read.success;

        responseObject.result = req.result;
      } else {
        responseObject = messages.read.failure;
      }

      res.status(responseObject.status).send(responseObject);
      break;

    case "POST":
      let object;

      if (req.result) {
        object = messages.create.success;

        object.result = req.result;
      } else {
        object = messages.create.failure;
      }

      res.status(object.status).send(object);

      break;

    case "PUT":
      let response;

      if (req.result == 200) {
        response = messages.update.success;
      } else {
        response = messages.update.failure;
      }

      res.status(response.status).send(response);
      break;

    case "DELETE":
      let responseBody;

      if (req.result == 200) {
        responseBody = messages.delete.success;
      } else {
        responseBody = messages.delete.failure;
      }

      res.status(responseBody.status).send(responseBody);
      break;
  }
};
