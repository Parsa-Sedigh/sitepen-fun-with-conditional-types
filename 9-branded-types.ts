// type Path = string;
// type Path = string & {__brand: any};
type Path = string & {__brand: 'Path'};
// type Guid = string & {__brand: any};
type Guid = string & {__brand: 'Guid'};

// function copy(source: Path, destination: Path): boolean {/*...*/}
function copy(source: Guid, destination: Path): boolean

function isPath(p: string): p is Path {
    return true;
}
function assertPath(p: string): asserts p is Path {
    if (!isPath(p)) throw new Error('Not a path');
}

let src = 'AAA';
let dest = 'BBB';

assertPath(dest);

if (isPath(src)) {
    copy(src, dest); // should be errors
}

////////////////////////// answer:

