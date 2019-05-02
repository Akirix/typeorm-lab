#!/usr/bin/env node

import loadConfig from 'lib/loadConfig';
import {buildOrmConfig, getConnection, syncOrm} from 'lib/orm';

(async function load() {
    const runMode: string = process.env.RUN_MODE;
    console.log(`Running ${runMode} mode`);
    
    const dbConfig = loadConfig('config','config');
    const seeds = loadConfig('seeds',runMode);
    const ormConfig = buildOrmConfig(dbConfig, runMode);
    const connection: Connection = await getConnection(ormConfig);
    await syncOrm(connection,seeds);

    console.log('All seeds have been synced!');
})();