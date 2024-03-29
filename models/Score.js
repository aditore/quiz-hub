const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Score extends Model { }

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        total_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "quiz",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "score"
    }
);

module.exports = Score;