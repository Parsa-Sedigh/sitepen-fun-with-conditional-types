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

We need to find a way to ensure that string literals which are of type string, are not compatible with our Path type. How can we do that?
If the string literal is missing a property that our Path type requires, then we can ensure this incompatibility. But how we can do that?
Simplest way to do it, is to intersect string with an object type that has a property. This property won't actually be there at runtime, it doesn't have
to be, it's just there for the type checker, so we can keep track of what is a Path and what isn't a Path.
Let's call this property __brand and for now let's type it as any and we will see sth better to use there, but for now this works.
Now you can see src variable can no longer be passed to copy() . Because the type string does not have that __brand property.
I said we want to ensure that people check before they assume a string is actually a Path. How we can do this?
We can use a function call it isPath that accepts a string and retuns a boolean. Now perform the necessary checks to find out if the given string is a Path.
Let's say it is a Path and we put that function into an if statement, but still TS is not aware that this influenced the the type of p.
Now if we could use a type assertion when passing src to copy() inside the if statement, this works. But type assetions by definition are not 100 safe,
because we have:
if (isPath(src)) {
    copy(src as Path, dest as Path);
}
So although there is no errors reporting from TS, we only checked src with isPath(), not dest. It would be great if there would be an automatic
way for the type information to flow from isPath() to the true branch of the if statement and the answer is there is such a way and they're called
custom type guards. So instead of using `boolean` as the return type,  we can use a specialized syntax that will let TS know that this function changes
the type of p. We can use `p is Path` as return type of that function.
The runtime return type of this function is not influenced in any way, isPath() returns a boolean.
This specialized syntax will let TS know that isPath() is a custom type guard, namely that it impacts the type of it's parameter p.
Now we can remove type assertions. But we need to check for both src and dest with isPath().

Complementary to custom type guards, there are custom assertions, like assertPath() .
Now after assertPath() is called with the arg x, we know x would be of type Path. Because if it wasn't it would be thrown and we would never reach
the lines after calling assertPath() . But the TS compiler doesn't know this yet! But there is a way to let it know, namely we can add a type annotation as
the return type of assertPath() and we can say: assets p is Path .

So with assert functions we can throw a runtime error if the assertion is not true(is not of the type that we're asserting against).

So these were two ways we can check types either by performing a check and using it in a conditional like if statements(custom type guards approach),
or by asserting it is a Path and throwing an error if it is not.

Remember that we said the type of __brand property doesn't really matter? Well it doesn't matter for compatibility between string and our branded type and 
it doesn't matter for compatibility between two Paths. However it does matter if we define another type(let's call it Guid or globally unique identifier).
Now if this new type has the same property and it's of the same type, those two types describe the same kind of object(or in our terminology, the same set), they 
are strings that also have __brand property. So these two sets are basically the same set(type). So now if we replace the type of source in copy function from 
Path to Guid, no error will occur because both those types are actually the same type. How we can avoid this?
We need to be more specific here(type of the __brand property) and instead of `any` as the type, use a more specific type, preferably a 
descriptive one. So replace any with string literal "Path" for the Path type and ... .
So now we have a incompatibility between Guid and Path because the types are different on the __brand property. This is what we wanted.

There's another solution is to use a unique symbol. The benefit of this solution is that you have a stronger guarantee that nobody else will use the 
same string as you. Unique symbols can be defined in TS and TS can ensure that no other symbol is compatible with that particular unique symbol, except the one
that you declared at that specific code location.

# What are branded types
- they are a primitive type intersected with an object type in order to ensure that the primitive literals are not directly compatible with this new branded
type.
- The object type that ensures that the resulting type is no longer compatible with the primitive type
    - this can be done with a string literal property(like: __brand: 'Path').
    - or can be done with a unique symbol
    - or can be done with any but that exposes you to easy aliasing by other types

Other applications:
- generally enforce constraints on primitive types that can be traced in the type system.
    - a `number` is a database id. So we can create numbers that are guaranteed to be DB ids.
    - a `string` is a GUID. We can create strings that are guaranteed to be GUIDs.
    
So whenever we have a primitive type that also has an extra meaning, you can think about branded types.

Type operators:

# Getting the keys of a type
Question: How can we get a type with all the keys in an object type?
Answer: Using the keyof operator

# Getting the type of a variable
Question: How can we get a type of a variable?
Answer: Use the typeof operator

Important: keyof operator always acts on a type, but typeof operator acts on variables.
Important: The typeof operator although it shares it's name with the JS typeof operator, it's different from it. The JS typeof operator will return a 
string that represents the runtime type of the variable. However, the TS typeof operator will return the TS type of whatever variable it's given. 
If we have the typeof operator that's used in a expression which that expression will appear at runtime or will be evaluated at runtime, that means 
that's the JS version.
For example:
```typescript
if (typeof env === 'object') {
    
}
```
This typeof operator we used here, is the JS version of typeof operator, while if we used typeof inside a type or a type annotation, that means it's TS typeof 
operator which gives us full TS type of any variable.

# Indexed types
Question: (If we already have a type) How can we get a type(that represents the union) of all property values in an object?
```typescript
type Book = {
    pages: number;
    fontSize: number;
    name: string;
    author: string;
};
type R = ValueOf<Book>; // we want R to be string | number
```
For now let's see how we can get a type of a specific property. We can use an indexed type.

Note: [] is the indexing operator when used with an object: object['<a property of object>'] .

# Anatomy of indexed type
- it has a form of: T[K] where:
  - T can be any type expression like: Book, typeof env . 
  - K can be any valid type expression that can index T. For example for Book, K would be "name" or for arrays, it(K) can be a number.
- One interesting property of the indexing operation, is that it distributes over K if K is a union.
So T[K1 | K2 | ... Kn]  becomes T[K1] | T[K2] | ... T[Kn]
We can use the distributive aspect of indexed types for the answer of the question. The answer is we can an indexing operation that indexes over
all the properties of Book. So we need to use all the properties of Book for the union to index it.

**Learn: The keyof operator gives us a union of all keys of an object.**

# Safe get function
Question: How can we make a function to get a value in an object safety?
Answer: Use indexed access types, keyof and a generic function. Look at 13th file.
TODO: ~~Till 56:50~~

Usually the types of parameters are defined at the moment when you define your function and that is their final type.

With generic functions, we can DEFER the decision as to exactly what type a parameter will have, until that function gets invoked(until it's call side).
In our example, K extends keyof Env means K must be one of the properties of the Env type. So whoever is calling that function should be careful to only
provide a string for s that is among the properties of env.

By passing a string to version 2 function, the type of passed string would be string, but in version 3, for example by passing 'SERVER', the inferred type of 
generic would be string literal 'SERVER' not string!

# Some predefined mapped types:
- Partial: Creates a new type with the same properties, but will all properties being marked as optional.
- Record: It takes a union of keys and a type and it creates a new type with all of those keys and the type of the keys is going to be the type that was
  passed to the second parameter of Record. So it creates a type with a given set of properties, all of the same type
EX)
```typescript
type ValidPerson = Record<'name' | 'age' | 'company', boolean>;
type ValidPerson2 = Record<keyof Person, boolean>;
```
- Readonly: Creates a type with the same properties but with all properties **readonly**.
- Required: Creates a type with the same properties but will all properties **required**.
- Pick: Picks a set of properties from the given type. Pick will preserve the shape and structure of the original type, so if a field was optional in the
  original type, it will be optional in the Pick result. Or if it was readonly, the result type would also have that property with readonly modifier.
```typescript
type P = Pick<Person, 'name' | 'company'>
```

What makes these mentioned types, mapped types?
Because in definition of them, they share a syntax that is for mapped types.

Let's see sth that we can't solve just using these predefined mapped types:
# Custom mapped types
Question: How can we create a type with return type of all functions in another type? (We want a new type with the same keys but for each key we have
the return type of the original function instead of function itself.)
Answer: Use a CUSTOM mapped type in conjunction with conditional type `ReturnType`.

First let's see the anatomy of a mapped type by looking at the definition of Record<T, K>.

When we have [P in K]: T in a mapped type, K is going to be either a string literal type or a union of keys for our resulting type.
Now what is P here? 
It's some magic syntax. Mapped types have their own dedicated syntax. 
P is a type parameter. So what we're introducing before the `in` keyword in the [] of mapped type, is a type parameter which in this case is named P.
You can think of `P` as the variable in a for loop. Here, P is gonna be that variable that takes EACH value inside of our union or literal string type which
in this case is named K.

We can use P as a type to index into K like:  
```typescript
type T = {[P in keyof K]: K[P]};
``` 
and T is a type that looks exactly as K.

P<T extends {[n: string]: (...a: any) => any }> means:
T extends sth that if it's indexable with any string, the type of that indexing operation is gonna be a function takes any 
number of params and returns anything.

# Basic anatomy of a mapped type:
- Basic anatomy of a mapped type: [[P in K]: U]
  - P in K take each P in K
    - K is usually a union that will contain valid types that represent property names, so it can be strings, numbers or unique symbols(an example for K
      is: 'name' | 'field')
    - P will be each constituent of the union in turn(P in the first time would be 'name', then 'field')
    - P is a type parameter and can be used anywhere a type would be used inside the type expression U
  - U is the type of the property P. So for each consistent in the union K(which is going to be union of 'name' and 'age') and then each one of these
    is going to get it's own type which is represented by U in each time.
    - U can be any type expression 
      - valid values of U in this case: it can be a constant type expression like `string` or `number` typeof env
    - or it can be sth that depends on P
      - valid values of U in this case: P, Env[P], T[P], conditional types that depends on P

Now look at 15th file.

TILL 1:32:00

Remember that we said some mapped types preserve structure? For example Pick<T, K> will preserve the strucutre of the type it's picking from?
Preserving structure means for example if the original type is optional, the mapped type will also preserve that and would be optional.

Now how does this structure preservation happen?
**Look at 15th file and let's see if the Env type is gonna have the same modifiers as the type EnvGetters.**

When we have [P in keyof EnvGetter]: U , we're mapping over keys of EnvGetters. 

Why does modifiers preserve when mapping over types?
When we have: `keyof EnvGetters`, it will evaluate to: `"SERVER" | "PORT"`. **BUTTT!** now if we look at the resulting type which is
Env2, the modifiers are NOT preserved(for example if EnvGetters had a readonly modifier on one of it's properties, the mapped type won't have that), so if
you look at Env2 here, it won't preserve the modifiers of T:
```typescript
type Env2 = {
    [P in "SERVER" | "PORT"]: ReturnType<EnvGetters[P]>;
};
```
So the fact that we're mapping over keyof [some type] actually turns out to be important(because in the first approach that preserves the modifiers,
we had keyof [type] but in second one which we only use the union and not keyof, the modifiers are **not** preserved). It's not just the fact
that that mapped type can be composed from the parts it's made. It's not just the sum of it's parts. Because you can say: Yeah `keyof type` means
constituents of that type(that type is composed from it's consitutents), so in case we replace `keyof [type]` with `consituent 1| constituent 2 ...`, the
modifiers should preserve in second case too. _But this is not the case at all!_

**Important:** TS actually here detects the specialized pattern in which we're mapping over `keyof [type]` and it will say that: Ok, since you're mapping over
the keys of this given type, I'm going to preserve all the modifiers that I find in this type for each one of the properties.

There is another pattern that could be used for homophobic map types, for these map types that preserve structure. Namely instead of mapping 
over the keys of a type, we could be mapping over a type parameter which is constrained to be the keys of a given type and again that given type will
have it's modifiers preserved and this is actually what Pick does.

If you look at Pick, we see that the mapping operation happens over K, where K is a type param that extends keyof T, so it must be one of the
keys of the type T. This means since we have this pattern(having a type param which is constrained to the keys of a given type by using `keyof` and use that type param
in with the `in` keyword when mapping happens), we will have the preservation of modifiers that come from the type T(the type which we map over):
```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

We saw that by default if we use `keyof [some type]` in the mapping, then the modifiers are preserved(but with). But what if we want to explicitly add modifiers?
We can just add the modifier in the mapping expression([P in keyof ...]). For example to make all properties readonly(add readonly modifier to all properties):
```typescript
type Env = {
    readonly [P in keyof U]: U[P];
};
```

What if we want to remove a modifier when mapping over properties?
```typescript
type Env = {
    -readonly[P in keyof U]-?: U[P];
};
```
Here, we're removing the optional from all the properties. So if we added only `?` there, it adds the modifier, -? will remove the modifier. We could also
use `+?` for adding the modifier instead of only `?`. Also the above code removes the readonly modifier.

Tip: NonNullable will take a union and remove all the `undefined` and `null`s from that union.
For example: 
`type A = NonNullable<() => string | undefined>;`

Note: I want to stress the syntactic nature of these homomorphic mapped types. Namely that we **MUST** map over `keyof [some type]`. It's NOT ENOUGH for
the type we're mapping over to be some alias and if it was an alias, the structure preservation behavior won't work and therefore the modifiers of the 
resulted type won't be preserved, for example:
```typescript
type K = keyof EnvGetters;
type Env = {
    [P in K]: K[P];
};
```
Now the modifiers of EnvGetters won't be preserved for Env. Because Env is no longer a homomorphic mapped typed, it deosn't preserve structure. Why?
Because it's not mapping over `keyof [type]`.

So the `keyof [type]` has to be there **EXPLICITLY** and aliasing it with some other type won't preserve the structure of mapped type.

### Homomorphic mapped types
Some mapped types preserve structure and these are called homophobic mapped types and they're dependent on the SYNTAX we use for mapping(which that syntax
is using keyof [type] for mapping EXPLICITLY).

`{ [P in keyof T]: U }`

`[P in keyof T]` is the mapping expression.

type G<K extends keyof T> = { [P in K]: U }

- homomorphic mapped types preserve structure
- the type use in the `in` clause is(the two situations where modifiers are preserved in mapping):
  - `keyof T` - the modifiers of T are preserved
  - a type parameter that `extends keyof T` - the modifiers of T are preserved

### manipulating modifiers
- `{ readonly [P in keyof T]: U }` - adds `readonly` modifier to the resuling type
- `{ -readonly [P in keyof T]: U }` - removes `readonly` modifier
- `{ [P in keyof T] ?: U }` - adds ? modifier
- `{ [P in keyof T]-?: U }` - removes ? modifier

## conditional types
Question: How can we correctly type a function that return a string or a number based on the type of a passed in parameter?
Answer: We can use conditional types(another option is to use overloads).
Look at 16th file.

What are conditional types?
In TS we can make decisions as to what the type should be, based on other types.

TILL 1:43:00


Learn: If we want to iterate over EACH CONSTITUENT of a union, we need to use a conditional type on that union that ALWAYS evaluates
to true. So if U is a union type and we want to iterate over each constituent type of this union, we use a conditional type on this union
that always evaluates to true:
`type T = U extends U ? (here, we can take some decision to assign what type to each constituent) : never;`