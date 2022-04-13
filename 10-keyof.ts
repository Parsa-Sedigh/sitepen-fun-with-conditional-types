type Person = {name: string; age: number};
// type PersonKeys = 'name' | 'age';
type PersonKeys = keyof Person;
