import {DataTypes, Model} from "sequelize";
import {db, sequelize} from "../connect";
import {Movie} from "./movie";

export class Cinema extends Model{}
export class Show extends Model{}

Cinema.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        },
        unique: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    voters: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, { sequelize, modelName: "cinema", timestamps: true });

Show.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    ticket_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        },
        defaultValue: 0.0,
    },
    showing_on: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    },
    showing_at: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, { sequelize, modelName: "show", timestamps: true });

export const cinemaShows = Cinema.hasMany(Show, {
    as: 'Shows',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Show.belongsTo(Cinema, {as: "Cinema"});
Show.hasOne(Movie, {as: 'Movie'});
Movie.belongsTo(Show);

db.create_tables().then(result => console.log("Tables: Cinema, Show are created", result));