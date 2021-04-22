const assert = require('assert');

const colors = {
  green: "\x1b[32m",
  gray: "\x1b[0;2m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
  red_underlined: "\x1b[31;4m",
  green_underlined: "\x1b[32;4m",
};

const statuses = {
  passed: {
    color: "green",
    symbol: "\u2714",
  },
  failed: {
    color: "red",
    symbol: "\u2716",
  },
};

function log(msg) {
  console.log(msg);
}

function colorize(msg, color) {
  return `${colors[color]}${msg}${colors.reset}`;
}

async function test(name, callback) {
  try {
    if (callback.constructor.name === "AsyncFunction") {
      await callback();
    } else {
      callback();
    }
    const { color, symbol } = statuses["passed"];
    log(`${colorize(symbol, color)} ${colorize(name, "gray")}`);
  } catch (error) {
    const { color, symbol } = statuses["failed"];
    log(`${colorize(symbol, color)} ${colorize(name, "gray")}`);
    log(`${colorize(`  ${error.message.split("\n")[0]}`, "red")}`);
  }
}

function should(value) {
  return {
    equal: (data) => assert.strictEqual(value, data),
    notEqual: (data) => assert.notStrictEqual(value, data),
    deep: (data) => assert.deepStrictEqual(value, data),
    notDeep: (data) => assert.notDeepStrictEqual(value, data),
    rejects: async (msg) => await assert.rejects(value, msg),
    notRejects: (data) => assert.doesNotReject(data),
    ok: (data) => assert.ok(data)
  }
}

module.exports = { test, should };
