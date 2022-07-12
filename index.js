const express       = require('express');
const http          = require('http');
const cors          = require('cors');
// const socketio      = require('socket.io');
const PORT          = process.env.PORT || 5000;
const cookieSession = require('cookie-session');
const passport      = require('passport');
const app           = express();
const mongoose      = require('mongoose');
const server        = http.createServer(app);
const keys          = require('./config/keys'); 

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })  
);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
// const io = require('socket.io')(server, {
//   path: '/socket.io', // added this line of code
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./models/User');
require('./services/passport');
require('./services/socket')(io);
require('./routes/authRoutes')(app);

if(process.env.NODE_ENV === 'production') 
{
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(PORT);