type Doctor = {name: string; speciality: string;};
type Engineer = {name: string; field: string;};

const doctor: Doctor = {name: '', speciality: '', field: ''};
const engineer: Engineer = {name: '', speciality: '', field: ''};
const person: Doctor | Engineer = {name: '', speciality: '', field: ''}; // the question is: Why this doesn't get any error?

///////// answer: //////////
type Doctor2 = {type: 'd', name: string; speciality: string;};
type Engineer2 = {type: 'e', name: string; field: string;};

const doctor2: Doctor2 = {type: 'd', name: '', speciality: '', field: ''};
const engineer2: Engineer2 = {type: 'e', name: '', speciality: '', field: ''};
const person2: Doctor2 | Engineer2 = {type: 'd', name: '', speciality: '', field: ''};

function printPerson(p: Doctor2 | Engineer2) {
    // approach 1:
    if (p.type === 'd') {
        // p is now a Doctor2 in this branch(so we narrowed the whole parent object with this type guard)
        withDoctor2(p);
    }

    // approach 2:
    switch (p.type) {
        case "d": {
            console.log(p.speciality)
            break;
        }
        case "e": {
            console.log(p.field)
            break;
        }

        default: {
            /* Here we can assert `never` type to ensure that the p union is exhaustively checked or not(so this trick for exhaustive check with
            asserting never in swtich statements works with discriminated unions as well). */
            console.log(p);
        }
    }
}

function withDoctor2(p: Doctor2) {}

