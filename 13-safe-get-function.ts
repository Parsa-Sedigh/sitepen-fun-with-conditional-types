const env = {
    'SERVER': '',
    'PORT': 7808
};

////// version 1: not good: ///////
// function getValue(s: string): any {
//     return (env as any)[s];
// }

type Env = typeof env;

////// version 2: not generic: ///////
// function getValue(s: keyof Env): Env[keyof Env] {
//     return (env as any)[s];
// }

////// version 3: generic: ///////
// function getValue<K extends keyof Env>(s: K): typeof env[keyof Env] {
//     return (env as any)[s];
// }

////// version 4: simpler: ///////
function getValue<K extends keyof Env>(s: K): typeof env[K] {
    return (env as any)[s];
}

let server = getValue('SERVER'); // ideally string
let port = getValue('PORT'); // ideally number
let pport = getValue('PPORT'); // ideally error



