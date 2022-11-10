const pg = require('pg');

// Nos conectamos a la base de datos alojada en elephantsql
class PostgresService {
    constructor() {
        this.connectionString = 'postgres://phapzmex:kl-C3tLdmWEIyjfewtq5nzkpg9tYrVFE@peanut.db.elephantsql.com/phapzmex';
        this.pool = new pg.Pool(
            {connectionString:this.connectionString}
        );
    }

    async executeSql(sql){
        let result = await this.pool.query(sql);
        return result;
    }
}

module.exports = PostgresService;