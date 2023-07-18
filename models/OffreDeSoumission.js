const db = require('../config/db');

class OffreDeSoumission {
  static getAllOffresDeSoumission(callback) {
    db.query('SELECT * FROM offre_de_soumission', callback);
  }

  static getOffreDeSoumissionById(id, callback) {
    db.query('SELECT * FROM offre_de_soumission WHERE id_off = ?', [id], callback);
  }

  static createOffreDeSoumission(data, callback) {
    db.query('INSERT INTO offre_de_soumission SET ?', data, callback);
  }

  static updateOffreDeSoumission(id, data, callback) {
    db.query('UPDATE offre_de_soumission SET ? WHERE id_off = ?', [data, id], callback);
  }

  static deleteOffreDeSoumission(id, callback) {
    db.query('DELETE FROM offre_de_soumission WHERE id_off = ?', [id], callback);
  }
}

module.exports = OffreDeSoumission;
