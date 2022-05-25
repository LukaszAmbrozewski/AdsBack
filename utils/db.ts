import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'magak_ads',
    namedPlaceholders: true,   //żeby móc używać placeholderów
    decimalNumbers: true,
});