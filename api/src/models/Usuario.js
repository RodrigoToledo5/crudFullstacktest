const {DataTypes} = require('sequelize');
//Exportamos por modulo la funcion que define el modelo de las actividades
module.exports = (sequelize) => {
    //definimos el modelo.
    sequelize.define('usuario', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			validate:{
				isEmail: true,
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},//especificamos que solo recibimos del 1 al 5 pero hay que tener en cuenta que los valores son strings
		// especificamos las estaciones
	});
};