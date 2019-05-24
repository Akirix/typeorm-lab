import { createConnection, ConnectionOptions, Connection, getRepository, Repository, EntityManager } from "typeorm";
import fs from 'fs';
import path from 'path';

export function buildOrmConfig(dbConfig, runMode: string): ConnectionOptions {

    const baseDir = process.env.NODE_PATH;
    const dbType = dbConfig.type;
    return {
        type: dbType,
        entities: [
            `${baseDir}model/${runMode}/**/*.*s`
        ],
        migrations: [
            `${baseDir}migration/${runMode}/**/*.*s`
        ],
        subscribers: [
            `${baseDir}subscriber/${runMode}/**/*.*s`
        ],
        logging: dbConfig.logging,
        host: dbConfig.host,
        port: dbConfig.port,
        schema: (dbType === "postgres") ? dbConfig.schema : null,
        database: ( dbType === "sqljs" ) ? null : dbConfig.name,
        username: ( dbType === "sqljs" ) ? null : dbConfig.username,
        password: ( dbType === "sqljs" ) ? null : dbConfig.password,
        logger: this.logger
    };
}

export async function getConnection(ormConfig: ConnectionOptions): Promise<Connection> {

    let connection: Connection = null;
    try {
        console.log( 'Setting the orm client now' );
        connection = await createConnection( ormConfig );
    } catch ( error ) {
        console.error( error );
        process.exit( 1 );
    }

    return connection;
}

export async function syncOrm(connection: Connection, seeds, dropSchema: boolean = true) {

    try {
        await connection.synchronize( dropSchema );
    } catch (error) {
        console.error(`There was an error syncing the DB`,error);
    }

    if (dropSchema) {
        // console.log(seeds);
        Object.keys(seeds).forEach(async (key: string) => {
            // get the repo for the current list of seeds in the file
            const repo = connection.getRepository(key);
            
            //batches will indeed make life more difficult
            //don't know exactly why
            //const batch = [];

            //loop each actual seed data item
            seeds[key].forEach(async (seed) => {

                //the sad batch
                //batch.push(repo.create(seed));

                //save each one individually till batch is legit
                await repo.save(repo.create(seed));
            });

            //this is for the batch which does not quite work
            //repo.save(batch);
        });
    }

}

export async function loadSqliteFile(dbFile: string) {
    const dbDir: string = path.dirname(dbFile);

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir);
    }

    if (!fs.existsSync(dbFile)) {
        try {
            fs.writeFileSync(dbFile,'');
        } catch (e) {
            console.error(`There was an error creating the db file: ${dbFile}`,e);
        }
    }
}