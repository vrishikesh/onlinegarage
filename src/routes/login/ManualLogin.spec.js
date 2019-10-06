import { assert, expect } from "chai";
import { GET } from "./ManualLogin";

describe("Manual Login", () => {
  it("should return a object with string 'Manual Login'", async () => {
    const ml = await GET({});
    expect(ml.route).to.be.a("string");
  });
});
