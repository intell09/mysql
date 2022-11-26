require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const cityId = 4;
const countryId = 3;

module.exports = {
  getCountries: (req, res) => {
    sequelize
      .query(`SELECT  * FROM countries`)
      .then((dbResult) => {
        //console.log(dbResult);
        res.status(200).send(dbResult[0]);
      })
      .catch((err) => console.log(err));
  },

  createCity: (req, res) => {
    let { rating, name, countryId } = req.body;
    console.log("createCity");
    sequelize
      .query(
        `INSERT INTO cities (name, rating, country_id ) values ( '${name}', ${rating}, ${countryId});`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getCities: (req, res) => {
    sequelize
      .query(
        `SELECT ci.city_id, ci.name as city, ci.rating, co.country_id, co.name as country FROM cities ci join countries co on ci.country_id = co.country_id`
      )

      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deleteCity: (req, res) => {
    let { cities, id } = req.params;

    sequelize
      .query(`DELETE FROM cities WHERE city_id = ${id}`)

      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
