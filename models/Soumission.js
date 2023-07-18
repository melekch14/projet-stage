const db = require('../config/db');

class Soumission {
  static getAllSoumissions(callback) {
    db.query('SELECT * FROM soumission', callback);
  }

  static getSoumissionById(id, callback) {
    db.query('SELECT * FROM soumission WHERE id_soum = ?', [id], callback);
  }

  static createSoumission(data, callback) {
    db.query('INSERT INTO soumission SET ?', data, callback);
  }

  static updateSoumission(id, data, callback) {
    db.query('UPDATE soumission SET ? WHERE id_soum = ?', [data, id], callback);
  }

  static deleteSoumission(id, callback) {
    db.query('DELETE FROM soumission WHERE id_soum = ?', [id], callback);
  }
}

module.exports = Soumission;
