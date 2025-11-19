import GetConnection from "../config/connection";

async function check() {
    try {
        const pool = await GetConnection();
        console.log('Conexión establecida con SQL Server. Ejecutando consulta de prueba...');
        const result = await pool.request().query('SELECT TOP 5 * FROM Usuario');
        console.log('Resultado prueba (Usuario):', result.recordset);
        await pool.close();
        process.exit(0);
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(2);
    }
}

check();
