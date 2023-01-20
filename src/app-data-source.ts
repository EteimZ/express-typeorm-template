import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})