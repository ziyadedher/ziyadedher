const listEnumValues = <TEnum extends Record<string, string>>(
  enumObject: TEnum
): string[] => Object.values(enumObject);
export default listEnumValues;
