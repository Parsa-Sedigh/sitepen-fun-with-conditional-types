type Person = { type: 'e'; name: string; age: string; field: string; }
    | { type: 'd', name: string; age: string; speciality: string;};

/* Let's filter out the constituent which has type: 'e': */
type Doctor = Person & {type: 'd'};