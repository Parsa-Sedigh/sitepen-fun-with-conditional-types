// first try:
function withAlignment(alignment: string) {
}

function withAlignment2(alignment: 'right' | 'left' | 'center' | undefined | null) {
    // approach 1:
    // if (alignment === 'center' || alignment === 'right') { // this narrows alignment
    //     console.log(alignment);
    // } else {
    //
    // }

    if (!alignment) {
        return;
    }

    switch (alignment) {
        case 'center': {break;}
        case 'left': {break;}
        case 'right': {break;}
        default: { // would be of type never(nothing is left in this set)
            console.log(alignment);
            assertNever(alignment);
        }
    }
}


function assertNever(value: never) {
    throw new Error("unexpected");
}


