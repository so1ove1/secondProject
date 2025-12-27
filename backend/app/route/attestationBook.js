module.exports = (app) => {
    const attestation = require('../controller/attestationBook');
    const passport = require('passport');
    const auth = passport.authenticate('jwt', { session: false });
    
    app.get('/api/attestations', auth, attestation.findAll);
    app.post('/api/addAttestation',auth, attestation.create);
    app.post('/api/updateAttestation/:id',auth, attestation.update);
    app.post('/api/deleteAttestation/:id',auth, attestation.delete);
    app.get('/api/attestation/:id',auth, attestation.findById);
};