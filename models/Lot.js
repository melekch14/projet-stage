const db = require('../config/db');

class Lot {
  static getAllLots(callback) {
    db.query('SELECT * FROM lot', callback);
  }

  static getAllLots2(callback) {
    db.query('SELECT lotissemnt.nom as "lott", lotissemnt.id_lots , l.id_lot, l.description,l.surface,l.vocation,l.nom FROM lotissemnt join lot l on lotissemnt.id_lots = l.lott', callback);
  }

  static getLotById(id, callback) {
    db.query('SELECT * FROM lot WHERE id_lot = ?', [id], callback);
  }

  static createLot(data, callback) {
    db.query('INSERT INTO lot SET ?', data, callback);
  }

  static updateLot(id, data, callback) {
    db.query('UPDATE lot SET ? WHERE id_lot = ?', [data, id], callback);
  }

  static deleteLot(id, callback) {
    db.query('DELETE FROM lot WHERE id_lot = ?', [id], callback);
  }
}

module.exports = Lot;
