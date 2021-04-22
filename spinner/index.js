const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function spin(msg, func) {
  process.stdout.write("\n");
//   process.stdout.clearScreenDown();
  const chars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  let index = 0;
  const { rows, cols } = rl.getCursorPos();

  const interval = setInterval(() => {
    let line = chars[index];
    if (line === undefined) {
      index = 0;
      line = chars[index];
    }
    const { rows, cols } = rl.getCursorPos();
    process.stdout.cursorTo(rows, cols);
    rl.write(`${chars[index]} ${msg}`);
    index = index > chars.length - 1 ? 0 : ++index;
  }, 100);

  func()
    .then(() => {
      rl.clearLine();
      process.stdout.cursorTo(rows, cols);
      rl.write(`\u2714 ${msg}\n`);
      interval.unref();
    })
    .catch(() => {
      rl.clearLine();
      process.stdout.cursorTo(rows, cols);
      rl.write(`\u2716 ${msg}\n`);
      interval.unref();
    });
}

module.exports = spin;
