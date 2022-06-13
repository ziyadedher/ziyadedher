const asEnum = <
  TEnum extends Record<string, number | string>,
  TKey extends string & keyof TEnum
>(
  enumObject: TEnum,
  value: string
): TEnum[TKey] | null => {
  if (Object.values(enumObject).includes(value)) {
    return value as unknown as TEnum[TKey];
  }
  return null;
};

const listEnumValues = <TEnum extends Record<string, string>>(
  enumObject: TEnum
): string[] => Object.values(enumObject);

export { asEnum, listEnumValues };
