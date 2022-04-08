function withNumberOrString(p: string | number | boolean) {
    if (typeof p === 'string') {
        // p is string in this branch
    } else if (typeof p === 'boolean') {

    } else if (typeof p === 'number') {
        // p is a number in this branch
    } else {
        /* Since we removed string, boolean and number from the union, the only thing that is left from this type is nothing. So we get the
        never type on this branch. */
    }
}

function withNumberOrStringForObj(p: {foo: string | number | boolean}) {
    if (typeof p.foo === 'string') {
        // p.foo here would be a string
    } else if (typeof p.foo === 'boolean') {
        withBooleanFoo(p);
    } else if (typeof p.foo === 'number') {
    } else {
        p.foo // p.foo is never here
    }
}

function withBooleanFoo(p: {foo: boolean}) {}