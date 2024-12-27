const asEnum = <TEnum extends Record<string, number | string>>(
  enumObject: TEnum,
  value: string,
): TEnum[keyof TEnum] | null => {
  if (Object.values(enumObject).includes(value)) {
    return value as unknown as TEnum[keyof TEnum];
  }
  return null;
};

const listEnumValues = (enumObject: Record<string, string>): string[] =>
  Object.values(enumObject);

export { asEnum, listEnumValues };
