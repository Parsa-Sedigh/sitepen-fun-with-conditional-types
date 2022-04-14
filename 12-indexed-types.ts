type Book = {
    pages: number;
    fontSize: number;
    name: string;
    author: string;
};

// get the type of a specific property by using an indexed type:
type TypeOfPages = Book['pages' | 'fontSize' | 'name' | 'author'];
// or:
type TypeOfPages2 = Book[keyof Book];

///////// let's make it generic: ///////////
type ValueOf<T> = T[keyof T];

type R = ValueOf<Book>;