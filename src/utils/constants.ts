// This regex will enforce that:
//  - The string starts with a letter.
//  - The string has at least one number.
//  - The string is at least 6 characters long.
//  - Only alphanumeric characters or #$@!%&*? special characters are allowed.
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z][A-Za-z\d#$@!%&*?]{5,}$/;
