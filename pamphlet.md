What we'll cover:
- unions and intersections
- literal types
- branded types
- index access types
- conditional types
- discriminated unions 
- type guards
- keyof, typeof
- mapped types
- template string literal types

# sets and types:
We can look at types as sets.
{foo: number} - the set of all values that are objects and have a foo property of type number
number - the set of all values that are floating point numbers
never - the empty set, no values can inhabit this set
unknown: the set of all possible values(if you can create this value in JS, then it belongs to this set, therefore it has the type unknown)

# set operations can be applied to types:
- unioning:
same concept as set unions. NAmely if we create a new set that represents the union of two other sets, that means that we're creating a set that has
values that can either belong to first set or second set. TODO: OR BOTH?
So if we create the union of two types, what we're creating is a new type whose values can either satisfy the conditions described by the first type
or the second type. 

For example if we have: {foo: number} | {bar: number} , this means they can either have a foo property of type number OR a bar 
property of type number. So this is the new set that we're describing.

Or: string | number this means that we want a set of values that are either strings or numbers

- intersections:
It's the same concept as the set intersection operation. Namely if we take the intersection of two other sets, we're left with only the values 
that belong to BOTH sets simultaneously.
For example if we create the intersection of our two object types, like: {foo: number} & {bar: number} , what we get is a new set or a new type which has
objects that have BOTH foo property of type number and a bar property of type number.

number & string means an intersection between number and string and this creates the set or the type of all values that are simultaneously both string and
numbers. What value is both a string AND a number? No value will satisfy this intersection, so what we get is the empty set which reduces to the
type `never`.

So intersections that can never happen, will reduce to the `never` type.

# unions - representing options
Question: How can I represent an object that is either a Engineer or a Doctor?
interface Engineer {name: string; age: string; field: string;}
interface Engineer {name: string; age: string; speciality: string;}
Answer: use a union.

Inside of printPerson() function, we cannot access properties that are NOT COMMON to both of those two interfaces. Why?
Because they both have name and age properties so we can access those properties without any further code. But we don't know if 
we're getting a Doctor or an Engineer. So we cannot access field or speciality fields(spoiler: we need to narrow the 
union) and this moves us to the second question:
# type guards - narrowing unions
Question: Why can't I access some union properties?
You can only safely access common properties. You need to narrow the type of the union.

There are several ways we can narrow a union. But for this type of union that is not discriminated and is a union of object types,
the simplest way we can do it is to use the `in` operator. This is called union narrowing and it's called narrowing because we took
a type that is a WIDER set and we narrowed it to just one of the union constituents. If we check for speciality property,
we get p as type Doctor, because that is the only consistent part of the union that is left after the narrowing.

So we saw how we can narrow a union namely using type gauards, but what are type guards?
They're syntactic constructs that can help us narrow a union and when I say syntactic, I mean that their form matters. So basically the form of our 
code is what let TS know that this is sth that we use to narrow the type of a specific variable.

The `in` type guard can only be used with object unions(with unions of several object types). But if we have a union of primitive types,
then we can use another namely the `typeof` operator to narrow the type of the union.

Type guards don't only work on variables or parameters of functions. We can narrow fields. For example, look at withNumberOrStringForObj function.

When you're narrowing a field, you're only narrowing the field itself, you're not narrowing the whole object. So in the mentioned function. the type of 
p object itself is not impacted in any way by either of those type guards that we have in the body of function. So p still has a field that is 
string or number or boolean, even though that field when we look at it in each branch, is of one of those union consituent types.
This quirk means that in some cases you might get surprising effects. For example when we call withBooleanFoo() in boolean type guard branch of
withNumberOrStringForObj . Because the type guard ONLY impacts the field(p.foo) itself.
Type guards narrow the symbol that they have been applied to. So in this case a field or a variable or a parameter.
If we want to narrow the parent object, we have several options, one of them is to use a custom type guard, but the better option would be to
use a discriminated union.

So to narrow the `value` variable:
- 'property' in value - the in type guard
- typeof value === 'valid JS primitive type' - the typeof type guard

# string and other literal types
Question: How can I strictly type the align property of an element(it can be one of the strings: "center", "left", "right")?
Answer: use string literal types.

If we say:
const right = "right";
we see that TS doesn't infer the type as string, but if we have a variable instead of constant:
let right = "right"; the type of variable would be string, instead of literal "right".

In TS, any literal value can also be used as a type. For example if we declare a variable and set it's type as literal string "right":
let variable: 'right';
then the only value we can assign, would be the value 'right'.

String literal types by themselves are not very interesting. Because the variable can only have one value. However they become useful if we pair them
with unions.

Learn: A string literal type represents a set with a SINGLE value, for example 'right'.

What are literal types?
- in ts, any value can also be a type and this type represents the set of value that actually contain only ONE value, the value that originated
this type.
- example:
- string literal types: 'center'
- number literal types: 0, 100
- boolean literal types: true, false
- null literal type: null
- undefined literal type: undefined

These are most useful when paired with unions.

# narrowing unions of literals
syntactic constructs that helps us narrow a union. To narrow the foo variable:
- 'property' in value - the `in` type guard
- typeof value === 'valid type' - the typeof type guard
- value === constant, value !== constant, !value, value expressions in if statements(we can use the quality operator, or 
not quality operator to narrow unions and we can also use logical operators and they will work just as we expect them in type guards)
- switch statements to narrow unions. We can also use a trick to ensure that our switch statement is exhaustive(which is by using a default
branch is switch and there use an assertion function that expects a value with the type `never`. This way the switch statement would be 
exhaustive. Why?
Because if we update the union that is passed to switch, by using more or less constituents, we need to UPDATE our case branchs, because we have a 
default switch branch which makes the switch, exhaustive.

When a function takes a parameter of type never, we basically never expect that any value to actually be passed as that parameter of function.

# strict null checking flag
What does strict null checking do?
It carves out null and undefined out of other types.
So in terms of sets: the values null and undefined are not by default, part of the set described by a type anymore.

Without strictNullChecking:
Important: Now, when we said that number is a set of all floating point numbers, what we meant was if we don't have strict null checking on, is that 
it is the set of all possible numbers OR the values null OR undefined. Similarly, string is the set of all string values or null or undefined.

With strictNullChecking:
number type becomes the set of all floating point numbers without null or undefined and similar for string type and if we want to allow null or undefined,
we can union the base types with null or defined to allow in those values back into the sets represented by those types.

Also string | null is the set of all values that are strings or null.

So let's union null or undefined with the parameter of withAlignment.

The simplest way to narrow down undefined from a union, is to use if (!<value that has undefined in it's union type>)

# discriminated unions
If we have two types and we put them in a union, we see that sth strange happens. If we take the same object
literal({name: '', speciality: '', field: ''}) and we try to assign it Doctor, it fails, if we assign it to Engineer, but it actually succeeds when
we try to assign it to the Doctor | Engineer . What's happening here? 
By default, TS will do what is called `access property checks`(look at the lines above the comment in 4-discriminated-unions.ts). 
If we try to assign a new object literal to reference of a specific type.
In the first assignment it fails because it does this access property checks and it's fields sees that `field` property is extra and it shouldn't be there and 
the similar goes to when we're assigning an object to engineer. So in second case, we see that it fails because our object literal has speciality and
Engineer doesn't have this field, so that is also a reason for access property checks to trigger an error.
Important: BUT in the third one, we see that if we try to assign it, it allows any of the fields that are present in ANY of the constituents of the union.
 This is by design and the simple way to get around this is to use a discriminated union. We will see another solution for this a bit later on when we 
 don't change the structure of the types(which we do change it in discriminated unions approach), but we manage to create a condition where these extra fields
are an error.

Question: Why does my union allow properties from any union consistent?

Answer: By design. Use a discriminated union. The fact that the third one(Doctor | Engineer) does allow extra fields, is sth that might not be
always in our interest. So we don't want to be able to pass both field and speciality to third one, so let's use discriminated union to remove this
ability.

Learn: Unions only allow fields that are present in at least on constituent.

Learn: A discriminated union is a union that has a field that is of a literal type that is incompatible between different constituents of the union.
So let's add a field named `type` to all of the constituents of the union in the third one and the value of that type field must be incompatible between
the constituents.
Now when we create a variable that is of type Doctor, we need to specify that is definitely is a Doctor by adding that new field set to the literal value 
of 'd' and also do this for the variable that is of type Engineer. Now if we try to use one of the literal values of field type in third one, then
we see that we either get an error on the field `field`(means we used `type: 'd'`) or on speciality field(means we used `type: 'e'`).

Now let's see how we can narrow a discriminated union?
Remember we said that: type guards don't narrow the type of the parent object, they only narrow the type of a field if they're applied to a field?
Well this is true, but discriminated unions are an exception to this rule. So if for example if we narrow p.type to === 'd', well then we've actually
narrowed the p object itself to just be a Doctor2, so it's no longer a Doctor2 | Engineer2 and if we have a field that only takes a Doctor2 , 
we can pass `p` to that function.

So if we have a discriminated union, the type narrowing actually DOES narrow the WHOLE PARENT OBJECT itself it doesn't narrow just the field.

# about discriminated unions
When do we create a discriminated union?
A discriminated union has to have a discriminant property which has to be either a union of literal types or is a union that contains at least one 
literal type and when we narrow the discriminant field, we actually narrow the WHOLE OBJECt that that field belongs to.

# type guards - narrowing unions:
Syntactic constructs that help us narrow a union.
To narrow the value variable:
- 'property' in value - the `in` type guard
- typeof value === 'valid type' - the typeof type guard
- value === constant, value !== constant, !value, value expressions in if statements
- switch(value) statements

# type guards - narrowing discriminated unions:
- to narrow the obj value that is discriminated by type:
  - obj.type === constant, ob.type !== constant, !obj.type, obj.type expressions in if statements
  - switch(obj.type) statements

Some examples that aren't actually discriminated unions.
For example, if a discriminant field inside a constituent is of type string, we can STILL discriminant the constituent that has a discriminator field
which is of a literal type. But we cannot discriminant the consituents which haven't a field with a discriminant field. Look at fifth file.
In the example and in if (typeof p.type === 'number') {} branch, we expect that in that branch, we would get only p as Engineer, because 
the field `type` is number ONLY in Engineer type. BUT TS doesn't narrow p there in that branch to just be Engineer , because that is no longer
a discriminated union. Neither of the types of type field in Engineer, is a literal type. So we cannot narrow the whole object.
So in that branch, p is of type Engineer | Artist , however the field itself was narrowed, so if we access p.type , it is of type number, but the 
whole object was not narrowed. So discriminated unions need a property of a literal type in order to narrow the type of the whole variable instead of 
narrowing just fields.

# intersections and union reduction
Question: If I have a union 'yes' | 'no' | 0 | 1 , how can I get the string or number constituents? 
Answer: Use an intersection to get just string constituents or number constituents.(We're gonna look at another option to do this later using conditional types.)

If we intersect this union with string type, we only get the string constituents and ... .
But how does this work(also why it works)?

# intersection and union reduction - rules;
When TS sees a type like: ('yes' | 'no' | 0 | 1) & string , it will try to apply some rules to it.
The first rule that it will try to apply, is to move the intersection inside. So TS will apply the distributive property of intersections and unions.
So it can move that intersection with string, inside of parentheses and distribute it across each constituent of the union.
So this is the first step that happens: ('yes' & string | 'no' & string | 0 & string | 1 & string)
Now, some of these intersections are uninhabitable by any values. So there are no possible values that could be there, for example 0 & string. There's no 
value that can be both 0 and string, so these reduce to never type.
So then we would have:
('yes' & string | 'no' & string | never | never)

Now we get `subtype reduction`. It means:
If we have an intersection between a literal type and it's PARENT type, the parent type just goes away because for example if sth has to be
'yes' AND has to be a string, the only string value that can be, that value is 'yes'.
This works in general if you have the type D which is subset of P, then D & P will just result to D.
If we think about it in terms of sets, this makes sense completely.

So now we have: 'yes' | 'no' | never | never 

Onioning with the empty set is always going to be a null operation(it doesn't matter). So never is just removed from union.
So a union with an empty set doesn't change the other set.
So we get: 'yes' | 'no'

# Filtering out object types
Question: Given a discriminated union, how can we filter out a specific union constituent?
Answer: Use an intersection.

So we saw this trick of intersecting with another type, in order to filter out some constituents of the union works with literal types, could it work
with sth more complicated? For example could it work with a discriminated union? Yes.

Now on the set level, what would be the result of Person & {type: 'd'}; ?
So we would have:
({ type: 'e'; name: string; age: string; field: string; }
| { type: 'd', name: string; age: string; speciality: string;}) & {type: 'd'} .
The first step TS does is to take the intersection and move it inside. So it will distribute it over all the union constituents.
There are no objects in { type: 'e'; name: string; age: string; field: string; } set, that are also part of {type: 'd'} set.
In other words, the type of property `type`, would be never, because there is no possible value that can at the same time be 'e' and 'd'.
So TS just reduces { type: 'e'; name: string; age: string; field: string; } & {type: 'd'} , to { type: never; name: string; age: string; field: string; }.
But since this object type has a `never` in it, it's clear to TS that this is not INSTANTIABLE. There is no value that could satisfy 
this type({ type: never; name: string; age: string; field: string; }).
So again, { type: never; name: string; age: string; field: string; } reduces to never.
Now based on the same rule that `never` being the empty set, inside the union has no effect, never is also removed from union.

So { type: 'e'; name: string; age: string; field: string; } can be removed because it reduces to never and never in union doesn't matter.
Now we have: { type: 'd', name: string; age: string; speciality: string;} & {type: 'd'} which can be simplified to
{ type: 'd', name: string; age: string; speciality: string;} because {type: 'd'} is already contained
within { type: 'd', name: string; age: string; speciality: string;} .

Intersections that result in `never` properties, are reduced to never. For example:
type Doctor = {type: 'x'} & {
    type: 'd';
    name: string;
    age: string;
    speciality: string;
};
the type of Doctor reduces to `never`.
Learn: So if we have two object types that have incompatible properties, and we intersect them, this means that some of the properties will
have type `never` and if some of the properties have type `never`, the whole object type may be simplified to `never` and we can use this when
trying to extract certain constituents of unions.

# Some strings preferred
Question: Can I offer some completions on a string value?
printColor('#FF00FF');
printColor('');<we need some completions here that shows blue, red>
Answer: Naive answer: `string | 'red' | 'blue'`(wouldn't work well).
So we have a function that takes a string parameter, but this string parameter while it CAN be any string, there are certain preferred strings.
While we can pass in any hex value which is string, we would like to suggest red and blue. 

Approach 1 doesn't work why?
The answer has to do with how unions and intersections are reduced in TS.

If we have: string | 'red' | 'blue', subtype reduction applies to this which subtype reduction is:
If D is sub set of P, then D | P is P. Because we have this parent set which contains all the values that D also contains. 
So if we have string | 'red' | 'blue', 'red' and 'blue' are superflawess. They don't add anything, because string already contains the values 'red' and 
'blue', so there's no reason to specify them separately. So this just reduces to string. So we don't get code completion.

So we need a way to prevent TS from reducing string | 'red' | 'blue' union to just string without actually changing the meaning of what is present here.
The answer is to intersect string(only string not union) with {}.
Now this solution doesn't add a lot of information to that string. It doesn't change it in any signifant way. Any string will still be 
compatible with string and empty object({}), but it does prevent subtype reduction. TS will not see that those string literal types are contained within
the set described by string & {} . So now we get code completion.

Let's look at another application of intersections:
# branded types
Question: How can I ensure that a string if a file path? (What we want to do is we want to take sth that is usually represented as a primitive type,
string or number and we want to ensure that it's hard to create a string literal or a number literal that is compatible with this new type).
Answer: We can use branded types.

TODO: ~~Till 42:00~~











Learn: If we want to iterate over EACH CONSTITUENT of a union, we need to use a conditional type on that union that ALWAYS evaluates
to true. So if U is a union type and we want to iterate over each constituent type of this union, we use a conditional type on this union
that always evaluates to true:
type T = U extends U ? (here, we can take some decision to assign what type to each constituent) : never;