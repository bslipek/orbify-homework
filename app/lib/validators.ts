import gjv from "geojson-validation";

type Validator<T> = (value: T) => undefined | string;

export const composeValidators =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...validators: Validator<any>[]) =>
    (value: string) =>
      validators.reduce(
        (error: string | undefined, validator): string | undefined =>
          error || validator(value),
        undefined,
      );

export const required = (): Validator<string> => (value) => {
  return value === undefined || value === null || value.trim?.() === ""
    ? "is required"
    : undefined;
};

export const maxLength =
  (expectation: number): Validator<string> =>
  (value: string) => {
    return value?.length > expectation
      ? `max ${expectation} characters`
      : undefined;
  };

export const isValidGeoJSON = (): Validator<object> => (value) => {
  if (!gjv.valid(value)) {
    const trace = gjv.isFeature(value, true);
    return trace[0];
  }

  return undefined;
};
