module.exports = (app) => {
    const attestation = require('../controller/attestationBook');
    app.get('/api/attestations', attestation.findAll);
    app.post('/api/addAttestation', attestation.create);
    app.post('/api/updateAttestation/:id', attestation.update);
    app.post('/api/deleteAttestation/:id', attestation.delete);
    app.get('/api/attestation/:id', attestation.findById);
};