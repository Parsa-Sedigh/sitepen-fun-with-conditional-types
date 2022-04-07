/*
Learn: If we want to iterate over EACH CONSTITUENT of a union, we need to use a conditional type on that union that ALWAYS evaluates
 to true. So if U is a union type and we want to iterate over each constituent type of this union, we use a conditional type on this union
 that always evaluates to true:
 type T = U extends U ? (here, we can take some decision to assign what type to each constituent) : never;*/
