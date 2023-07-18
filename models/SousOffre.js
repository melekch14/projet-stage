const db = require('../config/db');

class SousOffre {
  static getAllSousOffres(callback) {
    db.query('SELECT * FROM sous_offre', callback);
  }

  static getSousOffreById(id, callback) {
    db.query('SELECT * FROM sous_offre WHERE id_soff = ?', [id], callback);
  }

  static createSousOffre(data, callback) {
    db.query('INSERT INTO sous_offre SET ?', data, callback);
  }

  static updateSousOffre(id, data, callback) {
    db.query('UPDATE sous_offre SET ? WHERE id_soff = ?', [data, id], callback);
  }

  static deleteSousOffre(id, callback) {
    db.query('DELETE FROM sous_offre WHERE id_soff = ?', [id], callback);
  }
}

module.exports = SousOffre;
