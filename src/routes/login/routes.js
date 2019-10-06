// @flow

import * as ManualLogin from "./ManualLogin";
import * as VerifyEmail from "./VerifyEmail";

const routes = [
  {
    method: "GET",
    path: "/Login/ManualLogin",
    config: {
      handler: ManualLogin.GET,
      description: "Manual Login Route",
      notes: "Returns a manual login route",
      tags: ["api"]
    }
  },
  {
    method: "GET",
    path: "/Login/VerifyEmail",
    config: {
      handler: VerifyEmail.GET,
      description: "Verify Email Route",
      notes: "Returns a verifyemail route",
      tags: ["api"]
    }
  }
];

export default routes;
