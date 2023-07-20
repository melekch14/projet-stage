const db = require('../config/db');

class Lot {
  static getAllLots(callback) {
    db.query('SELECT * FROM lot', callback);
  }

  static getAllLots2(callback) {
    db.query('SELECT lotissement.nom as "lott", lotissement.id_lots, v.label as "vocation", v.id_vocation , l.id_lot, l.code_lot, l.description,l.surface,l.nom FROM lotissement join lot l on lotissement.id_lots = l.lott join vocation v on v.id_vocation = l.id_vocation', callback);
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
