const chars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let index = 0;

function spin() {
  process.stdout.write("\x1B[?25l")
  const spinnerFrames = chars
  const spinnerTimeInterval = 80
  let index = 0
  this.timer = setInterval(() => {
      let now = chars[index]
      if (now == undefined) {
          index = 0
          now = chars[index]
      }
      if (this.random) {
          this.randomise()
      }
      process.stdout.write(now)
      process.stdout.cursorTo(0, 0)
      index = index >= spinnerFrames.length ? 0 : index + 1
  }, spinnerTimeInterval)
}

spin();