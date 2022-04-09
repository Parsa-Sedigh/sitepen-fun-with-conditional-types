// approach 1:
function printColor(s: (string & {}) | 'red' | 'blue') {}

printColor('red');
printColor('blue');
printColor('#00000');