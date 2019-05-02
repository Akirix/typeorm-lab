/**
 * @module lib
 */
import * as yaml from 'js-yaml';
import fs from 'fs';

/**
 * Properly loads the correct config from the config folder. 
 */
export default function loadConfig( dir: string, name: string = 'config' ): any {

    const path = process.cwd() + '/' + dir;
    
    const file = `${path}/${name}.yml`;

    let config: any;

    try {
        config = ( fs.existsSync( file ) ) ? yaml.safeLoad( fs.readFileSync( file, 'utf8' ) ) : {};
    } catch ( err ) {
        console.error( err );
    }
    return config;
}