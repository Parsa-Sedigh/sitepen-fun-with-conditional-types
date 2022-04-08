type LooseBoolean = 'yes' | 'no' | 0 | 1;

// only the string constituents:
type stringValues = LooseBoolean & string;

// only the number constituents:
type numberValues = LooseBoolean & number;