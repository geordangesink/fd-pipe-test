const path = require('bare-path')
const { spawn } = require('bare-subprocess')
const fs = require("bare-fs");
const program = global.Bare ?? global.Pear

console.log('Running from Pear:', program.argv[0].includes('pear'))

const childPath = path.resolve(__dirname, 'child.js')

console.log(program.argv[0])
console.log(program.argv.slice(0))
console.log(childPath)

// Spawn a child with a pipe at fd 3
const child = spawn(
  program.argv[0], 
  program.argv[0].includes('pear') ? ['run', childPath] : [childPath], 
  {
    stdio: ["inherit", "inherit", "inherit", "overlapped"]
  }
);

try {
  console.log('----------------PARENT----------------')
  const stats = fs.fstatSync(3);
  console.log("fd 3 stats:", stats);

  console.log("isFIFO:", stats.isFIFO());     // true → it's a pipe
  console.log("isSocket:", stats.isSocket()); // false
} catch (err) {
  console.error("Could not stat fd 3:", err.message);
}

child.stdio[3].write("hello from parent!\n");
child.stdio[3].end();
