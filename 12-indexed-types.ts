type Book = {
    pages: number;
    fontSize: number;
    name: string;
    author: string;
};

// get the type of a specific property by using an indexed type:
type TypeOfPages = Book['pages'];