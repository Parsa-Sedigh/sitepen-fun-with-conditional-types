interface Engineer {name: string; age: string; field: string;}
interface Doctor {name: string; age: string; speciality: string;}

function printPerson(p: Engineer | Doctor) {
    console.log(p.name);
    console.log(p.age);

    if ('speciality' in p) { // p now is a Doctor
        console.log(p.speciality);
    } else { // p now is an Engineer
        console.log(p.field);
    }
}

printPerson({
    name: '',
    age: '',
    field: ''
});

printPerson({
    name: '',
    age: '',
    speciality: ''
});

export {};