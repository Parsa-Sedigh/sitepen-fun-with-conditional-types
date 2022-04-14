type EnvGetters = {
    'SERVER': () => string,
    'PORT': () => number
};

// we want sth like this that is derived from EnvGetters:
type Env = {
    'SERVER': string,
    'PORT': number
};

type Record2 = {
    [P in keyof EnvGetters]: ReturnType<EnvGetters[P]>;
};

type AllReturnTypes<T extends {[n: string]: (...a: any) => any }> = {
    [P in keyof T]: ReturnType<T[P]>;
};

///// result: /////
type Env2 = AllReturnTypes<EnvGetters>;
