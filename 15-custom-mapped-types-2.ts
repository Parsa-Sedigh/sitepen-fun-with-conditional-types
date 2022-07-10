export function getValues(getters: EnvGetters, defaultValues: Env): Env {
    let o = {} as Env;
    for (const key of Object.keys(getters) as Array<keyof EnvGetters>) {
        const getter = getters[key];
        o[key] = (getter ? getter() : defaultValues[key]) as never;
    }
}

type EnvGetters = {
    "SERVER": () => string,
    "PORT": () => number
};

type Env = {
    [P in keyof EnvGetters]: ReturnType<EnvGetters[P]>
};
