const router = require('koa-router')()
const path = require('path');

const model = require('../model/model.js');
const Article = model.getModel('article');
const User = model.getModel('user');
const Words = model.getModel('words');


router.get('/article', async(ctx, next) => {
  // 总的查询， 查询所有的文章
  await next();

  const page = ctx.query.page ? ctx.query.page : 1;
  const pageSize = ctx.query.pageSize ? ctx.query.pageSize : 6;
  const skip = (page - 1)*pageSize;

  const result = await Article.find({}).sort({"createtime": -1}).skip(skip).limit(pageSize);
  const result1 = await Article.find({});
  const lengthResult = result1.length;

  for(var i = 0 ; i < result.length; i++) {
    result[i].text = result[i].text.substring(0, 250) + "......";
  }

  const lastPage = Math.ceil(lengthResult / pageSize);
  if (page <= lastPage) {
    ctx.body = {
      indexPage: page,
      lastPage: lastPage,
      total: lengthResult,
      data: result
    };
  } else {
    ctx.body = {
      data: result,
      total: null
    }
  }

})

router.get('/article/access', async(ctx, next) => {
  await next();
  // 记录文章被浏览的次数
  const _id = ctx.query._id;

  const data = await Article.findOne({ _id: _id });
  const data1 = data.access + 1;

  const result = await Article.update({ _id: _id }, { $set: { access: data1 } }).catch(err => {
    ctx.throw(500, "服务器错误")
  });
  console.log(result);
  ctx.body = {
    data: "access"
  }

})

router.get('/article/content', async(ctx, next) => {
  await next();
  // 查看文章的具体内容

  const _id = ctx.query._id;
  const result = await Article.findOne({_id: _id});


  ctx.body = {
    data: result
  }
})

router.get('/tecsharing', async(ctx, next) => {
  // 查询标签为技术分享的文章
  await next();



  const page = ctx.query.page ? ctx.query.page : 1;
  const pageSize = ctx.query.pageSize ? ctx.query.pageSize : 6;
  const skip = (page - 1)*pageSize;

  const result = await Article.find({ 'article_type': '技术分享'}).sort({"createtime": -1}).skip(skip).limit(pageSize);
  const result1 = await Article.find({ 'article_type': '技术分享'});
  const lengthResult = result1.length;

  for(var i = 0 ; i < result.length; i++) {
    result[i].text = result[i].text.substring(0, 250) + "......";
  }

  const lastPage = Math.ceil(lengthResult / pageSize);
  if (page <= lastPage) {
    ctx.body = {
      indexPage: page,
      lastPage: lastPage,
      total: lengthResult,
      data: result
    };
  } else {
    ctx.body = {
      data: result,
      total: null
    }
  }
})

router.get('/takestory', async(ctx, next) => {
  // 查询标签为韶华追忆的文章
  await next();

  const page = ctx.query.page ? ctx.query.page : 1;
  const pageSize = ctx.query.pageSize ? ctx.query.pageSize : 6;
  const skip = (page - 1)*pageSize;

  const result = await Article.find({ 'article_type': '韶华追忆'}).sort({"createtime": -1}).skip(skip).limit(pageSize);
  const result1 = await Article.find({ 'article_type': '韶华追忆'});
  const lengthResult = result1.length;

  for(var i = 0 ; i < result.length; i++) {
    result[i].text = result[i].text.substring(0, 250) + "......";
  }

  const lastPage = Math.ceil(lengthResult / pageSize);
  if (page <= lastPage) {
    ctx.body = {
      indexPage: page,
      lastPage: lastPage,
      total: lengthResult,
      data: result
    };
  } else {
    ctx.body = {
      data: result,
      total: null
    }
  }

})

router.get('/about', async(ctx, next) => {
  // 查询标签为关于我的文章
  await next();

  const page = ctx.query.page ? ctx.query.page : 1;
  const pageSize = ctx.query.pageSize ? ctx.query.pageSize : 6;
  const skip = (page - 1)*pageSize;

  const result = await Article.find({ 'article_type': '关于我'}).sort({"createtime": -1}).skip(skip).limit(pageSize);
  const result1 = await Article.find({ 'article_type': '关于我'});
  const lengthResult = result1.length;

  for(var i = 0 ; i < result.length; i++) {
      result[i].text = result[i].text.substring(0, 250) + "......";
  }

   lastPage = Math.ceil(lengthResult / pageSize);
  if (page <= lastPage) {
    ctx.body = {
      indexPage: page,
      lastPage: lastPage,
      total: lengthResult,
      data: result
    };
  } else {
    ctx.body = {
      data: result,
      total: null
    }
  }

})

router.get('/search', async(ctx, next) => {
  // 进行全文的模糊搜索, 主要是对article_type, title, description, content进行搜索
  await next();

  const page = ctx.query.page ? ctx.query.page : 1;
  const pageSize = ctx.query.pageSize ? ctx.query.pageSize : 6;
  const skip = (page - 1)*pageSize;

  const keywords = ctx.query.keywords ? ctx.query.keywords : "";
  const _filter = {
    $or: [
      {article_type: {$regex: keywords, $options: '$i'}},
      {title: {$regex: keywords, $options: '$i'}},
      {description: {$regex: keywords, $options: '$i'}},
      {content: {$regex: keywords, $options: '$i'}}
    ]
  }

  const result = await Article.find(_filter).sort({"createtime": -1}).skip(skip).limit(pageSize);
  const result1 = await Article.find(_filter);
  const lengthResult = result1.length;

  for(var i = 0 ; i < result.length; i++) {
    result[i].text = result[i].text.substring(0, 250) + "......";
  }

  lastPage = Math.ceil(lengthResult / pageSize);

  if (page <= lastPage) {
    ctx.body = {
      indexPage: page,
      lastPage: lastPage,
      total: lengthResult,
      data: result
    };
  } else {
    ctx.body = {
      data: result,
      total: null
    }
  }
})

router.get('/message', async(ctx, next) => {
  // 留言评论区域的初次功能渲染实现
  await next();

  if (ctx.cookies.get('username')) {
    var data1 = 1;
  } else {
    var data1 = 0
  }

  const result = await Words.find({}).sort({"createtime": -1})
  ctx.body = {
    data: result,
    code: data1
  }

})

router.get('/message/like', async(ctx, next) => {
  // 评论点赞的接口
  await next();

  const  _id = ctx.query._id;
  const islike = ctx.query.islike;

  if (islike == 0) {
    var result = await Words.update({_id: _id }, {$set: like, $inc: {count: 1}}, { multi: false })
    ctx.body = {
      data: '点赞成功'
    }
  } else if (islike == 1) {
    var result = await Words.update({_id: _id}, {like: 2})
    ctx.body = {
      data: '取消点赞成功'
    }
  }

})

router.get('/message/create', async(ctx, next) => {
  // 留言评论区的回复的新增功能实现
  await next();

  const username = ctx.cookies.get('username');
  const username_content = ctx.query.username_content;

  if (username && username_content) {

    await Words.create({
      username: username,
      username_content: username_content,
      createtime: new Date()
    })

    var result = "success";
  } else {
    var result = null
  }

  ctx.body = {
    data: result
  };

})

router.get('/admin', async(ctx, next) => {
  // 后台管理员页面的渲染

  await next();

  if (ctx.cookies.get('userid')) {
    ctx.body = {
      data: null,
      code: 1
    }
  } else {
    ctx.body = {
      data: null,
      code:  0
    }
  }

})

router.get('/admin/login', async(ctx, next) => {
  // 管理员账号的登录
  await next();

  const result1 = await User.findOne({ username: ctx.query.username });
  console.log(result1);

  if (result1) {
    if (result1.password == ctx.query.password) {
      if (result1.author !== 1) {
        ctx.body = {
          data: "权限不够"
        }
      } else {
        ctx.cookies.set('userid', result1._id, {
          maxAge: 1000 * 60 * 60 * 24 * 7
        })

        ctx.cookies.set('username', result1.username, {
          maxAge: 1000 * 60 * 60 * 24 * 7
        })

        ctx.body = {
          data: "success"
        }
      }
    } else {
      ctx.body = {
        data: "密码错误"
      }
    }
  } else {
    ctx.body = {
      data: null
    }
  }

})

router.get('/login', async(ctx, next) => {
  // 用户登录的接口

  await next();

  const result = await User.findOne({username: ctx.query.username});
  if (result) {
    if (result.password == ctx.query.password) {

      ctx.cookies.set('username', result.username, {
        maxAge: 1000 * 60 * 60 * 24 * 7
      })

      ctx.body = {
        data: "success"
      }
    } else {
      ctx.body = {
        data: "密码错误"
      }
    }
  } else {
    ctx.body = {
      data: "用户不存在"
    }
  }



})

router.get('/register', async(ctx, next) => {
  // 用户注册的接口

  await next();


  const result1 = await User.findOne({username: ctx.query.username});
  if (result1 == null) {
    await User.create({
      username: ctx.query.username,
      password: ctx.query.password
    })
    var result = "success"
  } else {
    var result = "用户名已存在";
  }

  ctx.body = {
    data: result
  }
})

router.get('/articleCreate', async(ctx, next) => {
  // 后台新建笔记的接口

  await next();

  const result = await Article.create({
    article_type: ctx.query.article_type,
    title: ctx.query.title,
    description: ctx.query.description,
    avatar: ctx.query.avatar,
    createtime: new Date(),
    content: ctx.query.content,
    text: ctx.query.text
  })
  if (result) {
    ctx.body = {
       data: "success"
    }
  } else {
    ctx.body = {
      data: "fail"
    }
  }

})


module.exports = router
