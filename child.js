const fs = require("bare-fs");

// Look at file descriptor 3
try {
  console.log('----------------CHILD----------------')
  const stats = fs.fstatSync(3);
  console.log("fd 3 stats:", stats);

  console.log("isFIFO:", stats.isFIFO());     // true → it's a pipe
  console.log("isSocket:", stats.isSocket()); // false
} catch (err) {
  console.error("Could not stat fd 3:", err.message);
}
