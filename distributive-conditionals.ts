type MakeArray<T> = T extends T ? T[] : never;
type R = MakeArray<string | number | boolean>;


type KeyOfAll<T> = T extends T ? keyof T : never;

type Person =
    | {name: string; field: string}
    | {name: string; speciality: string};

type Keys = KeyOfAll<Person>;
