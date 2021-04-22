process.on('SIGINT', (signal) => console.log(signal) || process.exit(1))
process.on('SIGTERM', (signal) => console.log(signal) || process.exit(1))

setTimeout(() => {
    console.log('NEVER GETS CALLED')
}, 5000);