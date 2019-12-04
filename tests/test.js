var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Echo', function() {
    it('should render the page /echo.js GET', function(done) {
        chai.request(server)
        .get('/echo')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });
});
