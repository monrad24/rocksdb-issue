const rocksdb = require('@farcaster/rocksdb');
const bs58 = require('bs58');

const dbConfig = {
    createIfMissing: false,
    readOnly: true,
    compression: true
};

// REPLACE WITH PROPER LOCATION
const db_location = '/home/[REPLACE WITH USER]/.rusty-kaspa-node-ok/kaspa-mainnet/datadir/utxoindex';

const db = rocksdb(db_location);

const openDatabase = () => {
    return new Promise((resolve, reject) => {

        db.open(dbConfig, (error) => {

            if (error) {
                reject(error);
                console.log(`There was an error opening the database: ${error}`)
            } else {
                resolve(true)
            }
        });
    })


}

const closeDatabase = () => {
    db.close((error) => {
        if (error) console.log(`There was an error closing the database: ${error}`)
        else console.log('Database successfully closed.');
    });
}

const loadDBData = async () => {
    let counter = 0;
    try {

        for await (const [key, value] of db.iterator({ keyAsBuffer: true, valueAsBuffer: true })) {
            if (!!address) {
                !storage.balances[address] && (storage.balances[address] = 0);
                (storage.balances[address] += (decodeValue(value) * 0.00000001));
                storage.balances[address + 'key'] = key.toString('hex');
                balance += storage.balances[address];
            }
            console.log(storage.balances[address]);
            counter++;
            if (counter === 10) break;
        }


    } catch (error) {
        console.error(error);

    }
}

const storage = {
    balances: {}
}

const main = () => {
    openDatabase()
        .then((value) => (value && console.log('Database successfully opened.')))
        .catch((error) => console.log('Error:', error))
        .then(() => loadDBData())
}

main();
