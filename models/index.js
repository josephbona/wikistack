var Sequelize = require('sequelize');
var marked = require('marked');
var db = new Sequelize('wikistack', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  logging: false
});

function generateUrlTitle(title) {
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
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
}, {
  hooks: {
    beforeValidate: function(page) {
      var title = page.dataValues.title;
      page.dataValues.urlTitle = generateUrlTitle(title);
    }
  },
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    },
    renderedContent: function() {
      return marked(this.content);
    }
  },
  classMethods: {
    findByTag: function(tags) {
      return this.findAll({
        where: {
          tags: {
            $overlap: tags
          }
        }
      });
    }
  },
  instanceMethods: {
    findSimilar: function() {
      return Page.findByTag(this.dataValues.tags);
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

Page.belongsTo(User, {
  as: 'author'
});

module.exports = {
  Page: Page,
  User: User
};