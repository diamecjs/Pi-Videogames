const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genres', {
        // id: {
        //     type: DataTypes.UUID
        //     allowNull:false

        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}