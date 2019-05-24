import fs from 'fs';
import path from 'path';

export default class SQLTasks {

    /**
     * Simply creates a file at the root of the project like so: `db/uber.db`
     */
    public static createSqliteDB(dbFile: string) {
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

    /**
     * Loads the contents of a sql file
     * @param sqlFile The path to a sql file
     * @returns The contents of an SQL file. 
     */
    public static getSqlFileContents(sqlFile: string): string {
        return fs.readFileSync(sqlFile).toString();
    }

}