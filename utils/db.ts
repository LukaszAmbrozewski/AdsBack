import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    // password: 'xdxd',
    database: 'megaads',
    namedPlaceholders: true,   //żeby móc używać placeholderów
    decimalNumbers: true,
});