import { createConnection, ConnectionOptions, Connection, getRepository, Repository, EntityManager } from "typeorm";
import fs from 'fs';
import path from 'path';
import { Photo } from 'model/basic/Photo';
import { User } from 'model/basic/User';
import Name from 'model/akx/Name';
import Person from 'model/akx/Person';
import Phone from 'model/akx/Phone';

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

        let p1 = new Person();
        p1.id = 'a';
        let name1 = new Name();
        name1.first = 'Bob';
        name1.middle = 'J';
        name1.last = 'knob';
        p1.name = name1;


        let p2 = new Person();
        p2.id = 'b';
        let name2 = new Name();
        name2.first = 'Karen';
        name2.middle = 'C';
        name2.last = 'McLaren';
        p2.name = name2;


        await connection.getRepository('Person').save( p1 );
        await connection.getRepository('Person').save( p2 );


        let phone1 = new Phone();
        phone1.slug = 'home';
        phone1.value = '(801) 321-4567';
        phone1.isDefault = true;
        // phone1.contact = p1;
        phone1.contact_type = 'person';
        phone1.contact_id = 'a';
        await connection.getRepository('Phone').save( phone1 );


        let phone2 = new Phone();
        phone2.slug = 'cell';
        phone2.value = '(801) 321-4568';
        phone2.isDefault = true;
        // phone1.contact = p1;
        phone2.contact_type = 'person';
        phone2.contact_id = 'a';
        await connection.getRepository('Phone').save( phone2 );

        // let u1 = new User();
        // u1.name = "Roland Li";
        // await connection.getRepository('User').save(u1);
        //
        // let p1 = new Photo();
        // p1.id=1;
        // p1.title = 'New Photo 1';
        // p1.description = 'Photo of SLC';
        // p1.size ="1MB";
        // p1.user = u1;
        //
        // let p2= new Photo();
        // p2.id=2;
        // p2.title = 'New Photo 1';
        // p2.description = 'Photo of SLC';
        // p2.size ="1MB";
        // p2.user = u1;
        //
        //
        // await connection.getRepository('Photo').save(p1);
        // await connection.getRepository('Photo').save(p2);

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
