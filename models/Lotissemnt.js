// models/Lotissemnt.js
const db = require('../config/db');

class Lotissemnt {
  static getAllLotissemnts(callback) {
    db.query('SELECT * FROM lotissemnt', callback);
  }

  static getLotissemntById(id, callback) {
    db.query('SELECT * FROM lotissemnt WHERE id_lots = ?', [id], callback);
  }

  static createLotissemnt(data, callback) {
    db.query('INSERT INTO lotissemnt SET ?', data, callback);
  }

  static updateLotissemnt(id, data, callback) {
    db.query('UPDATE lotissemnt SET ? WHERE id_lots = ?', [data, id], callback);
  }

  static deleteLotissemnt(id, callback) {
    db.query('DELETE FROM lotissemnt WHERE id_lots = ?', [id], callback);
  }
}

module.exports = Lotissemnt;
