const path = require('bare-path')
const { spawn } = require('bare-subprocess')

const childPath = path.resolve(__dirname, 'child.js')

console.log(global.Bare.argv[0])
console.log(global.Bare.argv.slice(0))
console.log(childPath)
// Spawn a child with a pipe at fd 3
const child = spawn(global.Bare.argv[0], [childPath], {
  stdio: ["inherit", "inherit", "inherit", "overlapped"]
});

child.stdio[3].write("hello from parent!\n");
child.stdio[3].end();
