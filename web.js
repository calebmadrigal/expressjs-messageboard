// Simple Message board example with Express

/////////////////////////////////////////////////////////////////////////////////////////// REQUIRES
var express = require('express');
var _und = require('underscore');

///////////////////////////////////////////////////////////////////////////////////////////////// DB
var messages = [
  { text: 'The time has come, the walrus said' },
  { text: 'To speak of many things:' },
  { text: 'Of shoes-- and ships-- and sealing-wax--' },
  { text: 'Of cabbages-- and kings--' }
];

/////////////////////////////////////////////////////////////////////////////////// HELPER FUNCTIONS
function insert_id(msg, id) {
  return _und.extend({ id: id }, msg);
}

///////////////////////////////////////////////////////////////////////////////// ENDPOINT FUNCTIONS
function get_message_list(req, res) {
  var messages_with_ids = _und.map(messages, insert_id);
  res.jsonp(messages_with_ids);
}

function get_message(req, res) {
  if(messages.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.jsonp({ error: 'Invalid message id' });
  }

  var msg = messages[req.params.id];
  res.json(insert_id(msg, req.params.id));
}

function post_message(req, res) {
  if(!req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.jsonp({ error: 'Invalid message' });
  }  

  messages.push({ text: req.body.text });
  get_message_list(req, res);
}

function put_message(req, res) {
  if((messages.length <= req.params.id || req.params.id < 0) &&
      (!req.body.hasOwnProperty('text'))) {
    res.statusCode = 400;
    return res.jsonp({ error: 'Invalid message' });
  }  

  messages[req.params.id] = { text: req.body.text};
  get_message_list(req, res);
}

// CORS
//////////////////////////////////////////////////////////////////////////////////// CORS MIDDLEWARE
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

///////////////////////////////////////////////////////////////////////////////////////////// ROUTES 
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('jsonp callback', true);

app.get('/', get_message_list);
app.get('/messages', get_message_list);
app.get('/messages/:id', get_message);
app.put('/messages/:id', put_message);
app.post('/messages', post_message);

////////////////////////////////////////////////////////////////////////////////////// SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () { console.log("Listening on port " + port); });

