// starting at 2:14 ???

type KeyOfAll<T> = T extends T ? keyof T : never;

type Doctor = {name: string; speciality: string;};
type Engineer = {name: string; field: string};
type Artist = {name: string; preferredMedium: string;};

type Person = Doctor | Engineer | Artist;


