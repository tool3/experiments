const { ADDRGETNETWORKPARAMS } = require('dns');

const execute = require('util').promisify(require('child_process').exec);

async function check(args = process.argv.slice(2)) {
    const [name, expectedVersion] = [...args];
    const {stdout} = await execute(`npm view ${name}`);
    const line = stdout.split('\n').slice(-4)[0];
    const [,version] = line.split(':');
    const currentVersion = version.trim();
    console.log(currentVersion === expectedVersion)
}

check();