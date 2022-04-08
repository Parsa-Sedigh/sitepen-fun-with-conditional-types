type Doctor = {type: 'd', name: string; speciality: string;};
type Engineer = {type: number, name: string; field: string;};
type Artist = {type: boolean, name: string, field: string};

function printPerson(p: Doctor | Engineer | Artist) {
    if (p.type === 'd') {
        withDoctor(p);
    } else {
        if (typeof p.type === 'number') {
            console.log(p);
        }
    }
}

function withDoctor(p: Doctor) {}