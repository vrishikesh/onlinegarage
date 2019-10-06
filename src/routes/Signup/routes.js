// @flow

import * as CheckUsernameAvailability from "./CheckUsernameAvailability";
import * as ManualSignup from "./ManualSignup";

const routes = [
  {
    method: "GET",
    path: "/Signup/CheckUsernameAvailability",
    config: {
      handler: CheckUsernameAvailability.GET,
      description: "Check Username Availability Route",
      notes: "Returns a check username availability route",
      tags: ["api"]
    }
  },
  {
    method: "GET",
    path: "/Signup/ManualSignup",
    config: {
      handler: ManualSignup.GET,
      description: "Manual Signup Route",
      notes: "Returns a manual signup route",
      tags: ["api"]
    }
  }
];

export default routes;
