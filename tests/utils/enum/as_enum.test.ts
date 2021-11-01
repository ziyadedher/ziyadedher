import asEnum from "../../../src/utils/enum/as_enum";

enum MyEnum {
  A = "a",
  B = "b",
  C = "c",
}

describe("asEnum", () => {
  test("returns null on invalid enum value", () => {
    expect(asEnum(MyEnum, "d")).toBeNull();
  });

  test("chooses the correct enum", () => {
    expect(asEnum(MyEnum, "a")).toBe(MyEnum.A);
    expect(asEnum(MyEnum, "b")).toBe(MyEnum.B);
    expect(asEnum(MyEnum, "c")).toBe(MyEnum.C);
  });
});
