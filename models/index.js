var Sequelize = require('sequelize');
// var db = new Sequelize('postgres://localhost:5432/wikistack', {
//   logging: false
// });
var db = new Sequelize('wikistack', 'postgres', 'root', { dialect: 'postgres', host: 'localhost', port: 5432, logging: false});
function generateUrlTitle (title) {
  if (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
},
{
  hooks : {
    beforeValidate: function(page){
      var title = page.dataValues.title;
      page.dataValues.urlTitle = generateUrlTitle(title);
    }
  },
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Page.belongsTo(User, {as: 'author'});

module.exports = {
  Page: Page,
  User: User
};