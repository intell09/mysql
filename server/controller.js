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
    sequelize.query(`SELECT  * FROM cc_countries AS c
    JOIN country_id AS u ON c.city_id = u.city_id
    WHERE u.city_id = $(cityId);`)
    .then((dbResult) => {
        //console.log(dbResult); 
        res.status(200).send(dbResult[0]);
    })
    .catch((err) => console.log(err));
  }
  
}
 
createCity: (req, res) => {
  let {
    rating,
    name, 
    countryId,
    city, 
  } = req.body 


sequelize.query(`update country set rating = '${rating}', 
name = '${name}',
country = '${countryId}',
city = ${city}
where countryId = ${countryId};`)

.then(() => res.sendStatus(200))
.catch(() => console.log(err));

}


deleteCity: (req, res) => {
  let {
    cities,
    id, 
  } = req.params; 

sequelize.query(`update country set rating = '${rating}', 
cities= '${cities}',
id = '${id}',
city = ${city}
where city_id= ${city_id};`)

.then(() => res.sendStatus(200))
.catch(() => console.log(err));

}
