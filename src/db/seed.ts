import GetConnection from "../config/connection";
import * as fs from "fs";
import * as path from "path";

async function seed() {
    const sqlPath = path.join(__dirname, "../../db/init.sql");
    if (!fs.existsSync(sqlPath)) {
        console.error("No se encontró db/init.sql. Asegúrate de que el archivo exista.");
        process.exit(1);
    }

    const sqlText = fs.readFileSync(sqlPath, "utf8");

    // Split por 'GO' (línea sola) para ejecutar batches en mssql
    const batches = sqlText.split(/^GO\s*$/gim);

    try {
        const pool = await GetConnection();

        for (const raw of batches) {
            const batch = raw.trim();
            if (!batch) continue;
            console.log("Ejecutando batch de tamaño:", batch.length);
            try {
                // Usamos batch() para permitir múltiples statements
                await pool.request().batch(batch);
            } catch (err) {
                console.error("Error ejecutando batch:", err);
                throw err;
            }
        }

        console.log("Seed completado correctamente.");
        process.exit(0);
    } catch (error) {
        console.error("Error al ejecutar seed:", error);
        process.exit(2);
    }
}

seed();
