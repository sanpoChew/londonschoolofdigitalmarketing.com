/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bunyan = __webpack_require__(5);

var _bunyan2 = _interopRequireDefault(_bunyan);

var _co = __webpack_require__(6);

var _co2 = _interopRequireDefault(_co);

__webpack_require__(7);

var _koa = __webpack_require__(8);

var _koa2 = _interopRequireDefault(_koa);

var _koaBetterBody = __webpack_require__(9);

var _koaBetterBody2 = _interopRequireDefault(_koaBetterBody);

var _koaConvert = __webpack_require__(10);

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaHbs = __webpack_require__(11);

var _koaHbs2 = _interopRequireDefault(_koaHbs);

var _path = __webpack_require__(12);

var _path2 = _interopRequireDefault(_path);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = _bunyan2.default.createLogger({ name: 'LSDM' });

new _koa2.default().use((0, _koaConvert2.default)((0, _koaBetterBody2.default)())).use((0, _koaConvert2.default)(_koaHbs2.default.middleware({
  viewPath: _path2.default.resolve('./src/views/pages'),
  partialsPath: _path2.default.resolve('./src/views/partials'),
  layoutsPath: _path2.default.resolve('./src/views/layouts'),
  defaultLayout: 'default',
  disableCache: true
}))).use(async (ctx, next) => {
  const render = ctx.render;
  ctx.render = async function _convertedRender(...args) {
    return _co2.default.call(ctx, render.apply(ctx, args));
  };
  await next();
}).use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    log.error(err);
  }
}).use(_routes2.default.routes()).listen(3000);

exports.default = log;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBaseData = loadBaseData;

var _directusSdkJavascript = __webpack_require__(17);

var _directusSdkJavascript2 = _interopRequireDefault(_directusSdkJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const directus = new _directusSdkJavascript2.default('6N5KABGc7ke4HtwtSxmiIz2jlDECIMUZ', process.env.npm_package_directus_dev, 1.1);

async function loadBaseData() {
  try {
    const { data: pages } = await directus.getItems('pages', {
      columns: 'name,link'
    });
    return {
      nav: pages.filter(page => page.type === 'Main'),
      courses: pages.filter(page => page.type === 'Course'),
      pages
    };
  } catch (err) {
    return new Error({ err });
  }
}

exports.default = directus;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hubspot = __webpack_require__(18);

var _hubspot2 = _interopRequireDefault(_hubspot);

var _request = __webpack_require__(20);

var _request2 = _interopRequireDefault(_request);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = new _hubspot2.default();
client.useKey(process.env.HS_KEY);

function addContact(contact) {
  return new Promise((resolve, reject) => {
    client.contacts.createOrUpdate(contact.email, {
      properties: Object.entries(contact).map(entry => ({
        property: entry[0],
        value: entry[1]
      }))
    }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

const pipelines = {
  getID: location => new Promise(resolve => {
    _request2.default.get({
      url: `https://api.hubapi.com/deals/v1/pipelines?hapikey=${ process.env.HS_KEY }&portalId=2651862`
    }, (err, res, body) => {
      const j = JSON.parse(body);
      Array.from(j).forEach(pipeline => {
        if (pipeline.active && pipeline.label === location) {
          resolve(pipeline.pipelineId);
        }
      });
    });
  }),
  getLocation: pipelineID => new Promise(resolve => {
    _request2.default.get({
      url: `https://api.hubapi.com/deals/v1/pipelines/${ pipelineID }?hapikey=${ process.env.HS_KEY }&portalId=2651862`
    }, (err, res, body) => {
      const j = JSON.parse(body);
      resolve(j.label);
    });
  })
};

function formatDate(date, courseID) {
  if (courseID === '10') {
    const endDate = new Date(date);
    endDate.setTime(endDate.getTime() + 5 * 86400000);
    return `${ date.getDate() } ${ date.toLocaleDateString('en', { month: 'short' }) } - ${ endDate.getDate() } ${ endDate.toLocaleDateString('en', { month: 'short' }) } ${ endDate.getFullYear() }`;
  }
  return `${ date.getDate() } ${ date.toLocaleDateString('en', { month: 'short' }) } ${ date.getFullYear() }`;
}

async function getDates(location, course) {
  const pipelineID = await pipelines.getID(location);
  return new Promise(resolve => {
    _request2.default.get({
      url: `https://api.hubapi.com/deals/v1/deal/paged?hapikey=${ process.env.HS_KEY }&portalId=2651862&includeAssociations=true&properties=pipeline&properties=course_size&properties=closedate&properties=amount&properties=course`
    }, (err, res, body) => {
      const j = JSON.parse(body);
      const courses = [];
      j.deals.forEach(deal => {
        const prop = deal.properties;
        if (!deal.isDeleted && prop.pipeline.value === pipelineID && prop.course.value === course && prop.closedate.value >= Date.now()) {
          const courseDate = new Date(Number(prop.closedate.value));
          courses.push({
            id: deal.dealId,
            location,
            date: formatDate(courseDate, course),
            price: `£${ prop.amount.value }.00`,
            full: prop.num_associated_contacts.value >= prop.course_size.value
          });
          return;
        }
      });
      resolve(courses);
    });
  });
}

async function getDeal(dealID, courseID) {
  return new Promise((resolve, reject) => {
    _request2.default.get({
      url: `https://api.hubapi.com/deals/v1/deal/${ dealID }?hapikey=${ process.env.HS_KEY }&portalId=2651862`
    }, (err, res, body) => {
      const j = JSON.parse(body);
      if (j.status && j.status.error) {
        reject(j);
        return;
      }
      if (j.properties.num_associated_contacts.value >= j.properties.course_size.value) {
        reject({ full: true });
        return;
      }
      pipelines.getLocation(j.properties.pipeline.value).then(location => {
        resolve({
          id: dealID,
          date: formatDate(new Date(Number(j.properties.closedate.value)), courseID),
          price: j.properties.amount.value,
          location
        });
      });
    });
  });
}

function associateDeal(contactID, dealID) {
  const url = `https://api.hubapi.com/deals/v1/deal/${ dealID }/associations/CONTACT?id=${ contactID }&hapikey=6660dfd3-02c2-4bfa-ba82-e76136a30814&portalId=2651862`;
  return new Promise(resolve => {
    _request2.default.put({
      url
    }, (err, res, body) => {
      if (!err && res.statusCode === 204) {
        resolve();
        return;
      }
      _index2.default.error(body);
      resolve();
    });
  });
}

exports.default = {
  addContact,
  associateDeal,
  getDates,
  getDeal
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(0);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _courses = __webpack_require__(14);

var _courses2 = _interopRequireDefault(_courses);

var _diagnostic = __webpack_require__(15);

var _diagnostic2 = _interopRequireDefault(_diagnostic);

var _forms = __webpack_require__(16);

var _forms2 = _interopRequireDefault(_forms);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _directus = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const index = new _koaRouter2.default().get(/^\/(.*)(?:\/|$)/, async (ctx, next) => {
  try {
    const baseData = await (0, _directus.loadBaseData)();
    ctx.state = baseData;
    await next();
  } catch (err) {
    _index2.default.error({ err });
  }
}).use('/courses', _courses2.default.routes(), _courses2.default.allowedMethods()).use('/diagnostic-tool', _diagnostic2.default.routes(), _diagnostic2.default.allowedMethods()).use('/forms', _forms2.default.routes(), _forms2.default.allowedMethods()).get('/', async ctx => {
  try {
    await ctx.render('home', Object.assign(ctx.state, {
      pageTitle: 'Home | London School of Digital Marketing'
    }));
  } catch (err) {
    _index2.default.error({ err });
  }
}).get('/:page', async ctx => {
  try {
    const [page] = ctx.state.pages.filter(p => p.link === ctx.params.page);
    await ctx.render(page.link, Object.assign(page, {
      pageTitle: `${ page.name } | London School of Digital Marketing`,
      nav: ctx.state.nav
    }));
  } catch (err) {
    _index2.default.error({ err });
  }
});

exports.default = index;

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("bunyan");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("co");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("dotenv/config");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("koa-better-body");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("koa-convert");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("koa-hbs");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailgunJs = __webpack_require__(19);

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const list = 'newsletter@mg.londonschoolofdigitalmarketing.com';
const mailgun = new _mailgunJs2.default({
  apiKey: process.env.MG_KEY,
  domain: process.env.MG_DOMAIN
});

async function checkListSub(address) {
  try {
    const { member: { subscribed } } = await mailgun.lists(list).members(address).info();
    return subscribed;
  } catch (err) {
    return false;
  }
}

async function addToList(address) {
  try {
    await mailgun.lists(list).members().create({ subscribed: true, address });
  } catch (err) {
    const subscribed = checkListSub(address);
    if (!subscribed) {
      throw err;
    }
  }
}

exports.default = {
  addToList
};

// function emailContact(contactID, contactFields) {
//   const studentName = `${contactFields.firstname} ${contactFields.lastname}`;
//   const studentLink = `https://app.hubspot.com/sales/2651862/contact/${contactID}/`;
//   return new Promise((resolve, reject) => {
//     request.post('https://api.mailgun.net/v3/mg.londonschoolofdigitalmarketing.com/messages', {
//       auth: {
//         user: 'api',
//         pass: 'key-f77d1304c1f5e2edaec1c852a41a8a8d',
//       },
//       form: {
//         from: `${studentName} <${contactFields.email}>`,
//         to: 'marriott@londonschoolofdigitalmarketing.com',
//         subject: 'New Contact',
//         text: `
//         ${studentName} is a new contact.
//
//         You can see their contact page here: ${studentLink}
//         `,
//       },
//     }, (err, res, body) => {
//       if (!err && res.statusCode === 200) {
//         const j = JSON.parse(body);
//         if (j.id) {
//           resolve(j);
//           return;
//         }
//         reject(Object.assign({ fail: 'email' }, j));
//       }
//       reject({ fail: 'email', status: res.statusCode, error: err });
//     });
//   });
// }
//
// function emailQuery(contactFields, query, contactID) {
//   const studentName = `${contactFields.firstname} ${contactFields.lastname}`;
//   const studentLink = `https://app.hubspot.com/sales/2651862/contact/${contactID}/`;
//   return new Promise((resolve, reject) => {
//     request.post('https://api.mailgun.net/v3/mg.londonschoolofdigitalmarketing.com/messages', {
//       auth: {
//         user: 'api',
//         pass: 'key-f77d1304c1f5e2edaec1c852a41a8a8d',
//       },
//       form: {
//         from: `${studentName} <${contactFields.email}>`,
//         to: 'marriott@londonschoolofdigitalmarketing.com',
//         subject: 'New Query',
//         text: `
//         ${studentName} has a question:
//
//           ${query}
//
//         Contact Page: ${studentLink}
//         `,
//       },
//     }, (err, res, body) => {
//       if (!err && res.statusCode === 200) {
//         const j = JSON.parse(body);
//         if (j.id) {
//           resolve(j);
//           return;
//         }
//         reject(Object.assign({ fail: 'email' }, j));
//       }
//       reject({ fail: 'email', status: res.statusCode, error: err });
//     });
//   });
// }

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(0);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _stripe = __webpack_require__(21);

var _stripe2 = _interopRequireDefault(_stripe);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _directus = __webpack_require__(2);

var _directus2 = _interopRequireDefault(_directus);

var _hubspot = __webpack_require__(3);

var _hubspot2 = _interopRequireDefault(_hubspot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeMeta(data, fields = []) {
  return data.map(d => Object.assign(d, ...fields.map(f => ({ [f]: d[f].data[0][f] }))));
}

const courseRouter = new _koaRouter2.default().get('/', async ctx => {
  try {
    const { data } = await _directus2.default.getItems('courses');
    const parsedData = removeMeta(data, ['link']);
    const courseData = {
      long: parsedData.filter(c => c.Type === 'Long Course'),
      short: parsedData.filter(c => c.Type === 'Short Course').map(c => {
        if (c.course_content) {
          return Object.assign(c, {
            course_content: c.course_content.split('\r\n')
          });
        }
        return c;
      })
    };
    await ctx.render('courses', Object.assign(ctx.state, {
      pageTitle: 'Our Courses | London School of Digital Marketing',
      courseData
    }));
  } catch (err) {
    _index2.default.error({ err });
  }
}).get('/:course', async ctx => {
  try {
    const { data: [page] } = await _directus2.default.getItems('pages', {
      filters: { link: ctx.params.course }
    });
    const templateName = page.course.data.Type === 'Short Course' ? 'module' : 'diploma';
    if (templateName === 'diploma') {
      const { data } = await _directus2.default.getItems('courses', {
        filters: { parent_course: page.course.data.id }
      });
      const parsedSubCourses = removeMeta(data, ['link']);
      page.sub_courses = parsedSubCourses.map(course => Object.assign(course, {
        course_content: course.course_content.split('\r\n')
      }));
    }
    await ctx.render(templateName, Object.assign(ctx.state, {
      pageTitle: `${ page.name } | London School of Digital Marketing`,
      page
    }));
  } catch (err) {
    _index2.default.error({ err });
  }
}).get('/:course/enrol/:dealid', async ctx => {
  try {
    const { data: [{
        course: {
          data: course
        }
      }] } = await _directus2.default.getItems('pages', {
      filters: { link: ctx.params.course }
    });
    console.log(course);
    course.link = ctx.params.course;
    const deal = await _hubspot2.default.getDeal(ctx.params.dealid, course.id);
    await ctx.render('enrol', Object.assign(ctx.state, {
      layout: 'enrol',
      pageTitle: `${ course.name } | London School of Digital Marketing`,
      course,
      deal
    }));
  } catch (err) {
    _index2.default.error({ err });
  }
}).post('/:course/enrol/:dealid/enrol-complete', async ctx => {
  try {
    const stripe = (0, _stripe2.default)(process.env.ST_KEY);
    const { data: [{
        course: {
          data: course
        }
      }] } = await _directus2.default.getItems('pages', {
      filters: { link: ctx.params.course }
    });
    const charge = await stripe.charges.create({
      amount: course.price * 100,
      currency: 'gbp',
      source: ctx.request.fields.stripeToken,
      receipt_email: ctx.request.fields.stripeEmail,
      description: 'Enrolment'
    });
    _index2.default.info(charge);
    const contactFields = Object.assign({}, ctx.request.fields);
    delete contactFields.stripeToken;
    delete contactFields.stripeTokenType;
    delete contactFields.stripeEmail;
    const contact = await _hubspot2.default.addContact(contactFields);
    await _hubspot2.default.associateDeal(contact.vid, ctx.params.dealid);
    const deal = await _hubspot2.default.getDeal(ctx.params.dealid, ctx.params.courseid);
    await ctx.render('enrol-complete', Object.assign(ctx.state, {
      layout: 'enrol',
      pageTitle: 'Enrolment Complete | London School of Digital Marketing',
      course,
      deal
    }));
  } catch (err) {
    _index2.default.error({ err });
  }
});

exports.default = courseRouter;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(0);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const diagnosticRouter = new _koaRouter2.default().get('/start', async ctx => {
  await ctx.render('diagnostic-start', Object.assign(ctx.state, {
    layout: 'enrol',
    pageTitle: 'Diagnostic Tool | London School of Digital Marketing'
  }));
});

exports.default = diagnosticRouter;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(0);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _validator = __webpack_require__(22);

var _validator2 = _interopRequireDefault(_validator);

var _hubspot = __webpack_require__(3);

var _hubspot2 = _interopRequireDefault(_hubspot);

var _mailgun = __webpack_require__(13);

var _mailgun2 = _interopRequireDefault(_mailgun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateFields(fields) {
  return new Promise((resolve, reject) => {
    const invalid = [];
    Object.entries(fields).forEach(field => {
      switch (field[0]) {
        case 'email':
          if (!_validator2.default.isEmail(field[1])) {
            invalid.push(field[0]);
          }
          return;
        default:
          return;
      }
    });
    invalid.length > 0 ? reject({ invalid }) : resolve();
  });
}

const formRouter = new _koaRouter2.default().post('/:form', async (ctx, next) => {
  try {
    await validateFields(ctx.request.fields);
    await next();
  } catch (err) {
    if (err.invalid) {
      ctx.status = 422;
      ctx.body = err.invalid;
      return;
    }
    throw err;
  }
}).post('/city-filter', async ctx => {
  ctx.body = await _hubspot2.default.getDates(ctx.request.fields.city, ctx.request.fields.course);
}).post('/:course/brochure', async ctx => {
  await _hubspot2.default.addContact(ctx.request.fields);
  ctx.redirect(`/pdf/${ ctx.params.course }.pdf`);
}).post('/newsletter', async ctx => {
  await _mailgun2.default.addToList(ctx.request.fields.email);
  ctx.status = 200;
  ctx.body = 'Complete';
});

exports.default = formRouter;

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("directus-sdk-javascript");

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("hubspot");

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require("mailgun-js");

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("stripe");

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require("validator");

/***/ }
/******/ ]);