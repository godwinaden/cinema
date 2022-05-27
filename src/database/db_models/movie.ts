import {DataTypes, Model} from "sequelize";
import {db, sequelize} from "../connect";

export class Movie extends Model{}
export class Cast extends Model{}

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            len: [2, 60]
        }
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isAlphanumeric: true,
            len: [2, 60]
        }
    },
    cover_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
        unique: true
    },
    episode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    chief_director: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 50]
        }
    },
    chief_producer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 50]
        }
    },
    production_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isNumeric: true
        }
    },
    voters: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isNumeric: true
        }
    },
}, { sequelize, modelName: 'movie', timestamps: true });

Cast.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 50]
        },
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isAlphanumeric: true
        },
        unique: true
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        },
    },
}, { sequelize, modelName: 'cast', timestamps: true });

export const movieCasts = Movie.hasMany(Cast, {
    as: 'Casts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
export const CastsMovie = Cast.belongsTo(Movie, {as: "Movie"});

db.create_tables().then(result => console.log("Tables: Movie, Cast are created", result));