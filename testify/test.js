const {test, should} = require('./');


    test('should do stuff', () => {
        console.log('doing stuff');
    });
    
    test('awaits promises', async () => {
        await new Promise(function(resolve, reject) { 
            setTimeout(resolve, 2000); 
        });
    });
    
    test('fails test', () => {
        throw new Error('something messed up');
    });
    
    test('works like a charm', async () => {
        const fs = require('fs').promises;
        const read = await fs.readFile(process.cwd() + '/testify/package.json')
        console.log(JSON.parse(read.toString()).name);
    });
    
    test('should just work', () => {
        should('just work').equal('just work');
    });

    test('should not work', async () => {
        await should(() => Promise.reject()).rejects('1234');
    });

