#!/usr/bin/env node

import loadConfig from 'lib/loadConfig';
import {buildOrmConfig, getConnection, syncOrm, loadSqliteFile} from 'lib/orm';

(async function load() {
    const runMode: string = process.env.RUN_MODE;
    console.log(`Running ${runMode} mode`);
    
    const dbConfig = loadConfig('config','config');

    if (dbConfig.type === 'sqlite') {
        const dbFile: string = `${process.cwd()}/db/tester.db`;
        dbConfig.name = dbFile;
        loadSqliteFile(dbFile);
    }

    const seeds = loadConfig('seeds',runMode);
    const ormConfig = buildOrmConfig(dbConfig, runMode);
    const connection: Connection = await getConnection(ormConfig);
    await syncOrm(connection,seeds);

    console.log('All seeds have been synced!');
})();