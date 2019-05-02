import { createConnection, ConnectionOptions, Connection, getRepository, Repository } from "typeorm";

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
        schema: dbConfig.schema,
        database: ( dbType === "postgres" ) ? dbConfig.name : null,
        username: dbConfig.username,
        password: dbConfig.password,
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

    await connection.synchronize( dropSchema );

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