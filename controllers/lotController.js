const Lot = require('../models/Lot');

exports.getAllLots = (req, res) => {
  Lot.getAllLots((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getAllLots2 = (req, res) => {
  Lot.getAllLots2((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getLotById = (req, res) => {
  const id = req.params.id;
  Lot.getLotById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Lot not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createLot = (req, res) => {
  const { description, surface, vocation, nom, lott } = req.body;
  const newLot = { description, surface, vocation, nom, lott };
  Lot.createLot(newLot, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Lot created', id: results.insertId });
    }
  });
};

exports.updateLot = (req, res) => {
  const id = req.params.id;
  const { description, surface, vocation, nom, lott } = req.body;
  const updatedLot = { description, surface, vocation, nom, lott };
  Lot.updateLot(id, updatedLot, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Lot not found' });
    } else {
      res.status(200).json({ message: 'Lot updated' });
    }
  });
};

exports.deleteLot = (req, res) => {
  const id = req.params.id;
  Lot.deleteLot(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Lot not found' });
    } else {
      res.status(200).json({ message: 'Lot deleted' });
    }
  });
};
