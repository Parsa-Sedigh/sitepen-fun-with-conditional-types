type Env2 = {
    restApi: {server: string, port: number},
    dbSerers?: Array<{server: string, port: number}>
};

type DeepReadonly<T> = {} & {
    readonly [P in keyof T]: DeepReadonly<T[P]>
};

type DeepReadonlyEnv = DeepReadonly<Env2>;