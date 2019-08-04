const Sequelize = require('sequelize');
const Model = Sequelize.Model
const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:3306/seethru`);
const {ingredients} = require('./ingredients.json')
const {descriptions} = require('./descriptions.json')
let descriptionsList = descriptions.split('. ')

class Information extends Model {}
Information.init({
  ingredient: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }}, {
    sequelize,
    indexes: [
      {
        unique: true,
        modelName: 'information',
        fields: ['ingredient']
      }
    ]
  }
)

Information.sync({force: true}).then(() => {
  let insertList = ingredients.map((ingredient, i) => {
    return Information.create({
      ingredient: ingredient,
      description: descriptionsList[i]
    })
  })
  Promise.all(insertList).then(() => {
    console.log('insertions complete')
  }).catch((err) => {
    console.log(err)
  })
})

module.exports = Information;