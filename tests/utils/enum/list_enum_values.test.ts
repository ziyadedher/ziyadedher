import listEnumValues from "../../../src/utils/enum/list_enum_values";

enum MyEnum {
  A = "a",
  B = "b",
  C = "c",
}

describe("listEnumValues", () => {
  test("lists the enum values", () => {
    expect(listEnumValues(MyEnum)).toStrictEqual(["a", "b", "c"]);
  });
});
