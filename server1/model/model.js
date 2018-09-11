const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/article';
mongoose.connect(DB_URL);

const models = {
  article: {
    'article_type':
      {
        type: String,
        require: true
      },
    'title':
      {
        type: String,
        require: true
      },
    'description':
      {
        type: String,
        require: true
      },
    'content':
      {
        type: String,
        require: true
      },
    'text':
      {
        type: String,
        require: true
      },
    'avatar':
      {
        type: String,
        require: true
      },
    'createtime':
      {
        type: Date,
        require: true
      },
    "access":
      {
        type: Number,
        require: true,
        default: 0
      }

  },
  comment: {
    "article_id":
      {
        type: String,
        require: true
      },
    "from_ucontent":
      {
        type: Array,
        default: []
      },
    "from_uid":
      {
        type: Array,
        default: []
      },
    "from_like":
      {
        type: Array,
        default: []
      },
    "to_content":
      {
        type: String,
        require: true
      },
    "to_id":
      {
        type: String,
        require: true
      },
    "like":
      {
        type: Number,
        require: true,
        default: 0
      }
  },
  user: {
    "author":
      {
        type: Number,
        require: true,
        default: 0
      },
    "password":
      {
        type: String,
        require: true
      },
    "username":
      {
        type: String,
        require: true
      }
  },
  words: {
    "username":
      {
        type: String,
        require: true
      },
    "username_content":
      {
        type: String,
        require: true
      },
    "like":
      {
        type: Number,
        require: true,
        default: 0
      },
    'createtime':
      {
        type: Date,
        require: true
      }
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
