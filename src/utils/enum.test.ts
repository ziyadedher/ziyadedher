import { asEnum, listEnumValues } from "./enum";

enum MyEnum {
  A = "a",
  B = "b",
  C = "c",
}

describe("enum", () => {
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

  describe("listEnumValues", () => {
    test("lists the enum values", () => {
      expect(listEnumValues(MyEnum)).toStrictEqual(["a", "b", "c"]);
    });
  });
});
