/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const bodyParser = require('./bodyParser');
const { parse } = require('url');
const fs = require('fs');


const notes = {};
module.exports = (req, res) => {
  const url = parse(req.url, true);
  if(req.method === 'POST' && url.pathname === '/characters') {
    bodyParser(req)
      .then(body => {
        const id = body.characterId;
        const note = body.note;
        notes[id] ? notes[id].push(note) : notes[id] = [note];
        res.statusCode = 204;
        fs.writeFile('./notes.txt', JSON.stringify(notes), { encoding: 'utf8' }, (err, data) => {
          if(err) return err;
          return data;
        });
        res.end();
      });
  }

  if(url.pathname.includes('/characters/1234')) {
    fs.readFile('./notes.txt', { encoding: 'utf8' }, (err, data) => {
      if(data) {
        let test = JSON.parse(data);
        console.log(test);

      }
    });
  }
};



