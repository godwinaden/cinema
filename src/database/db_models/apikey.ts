import {DataTypes, Model} from "sequelize";
import {db, sequelize} from "../connect";

export class ApiKey extends Model{}

ApiKey.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        },
        unique: true
    },
    secret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    public: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize, modelName: "api_key", timestamps: true });

db.create_tables().then(result => console.log("Table: ApiKey was created", result));