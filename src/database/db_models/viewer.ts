import {DataTypes, Model} from "sequelize";
import {sequelize} from "../connect";

export class Viewer extends Model{}
export class Seat extends Model{}

Viewer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mobile_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize, modelName: 'viewer', timestamps: true });

Seat.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { sequelize, modelName: 'seat', timestamps: true });

export const viewerSeats = Viewer.hasMany(Seat, {
    as: 'Seats',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Seat.belongsTo(Viewer);

