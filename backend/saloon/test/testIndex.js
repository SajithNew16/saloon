var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/POST Create User', () => {
    it('Create User Testing', (done) => {
        let user = {
            'userName': 'he8',
            'password': 'rferr',
            'email': 'erf@frse.com'
        }
        chai.request('http://localhost:3000')
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});
describe('GET User Id by email', () => {
    it('Get User Id testing', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/user/chamaraliyanage604@gmail.com')
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body.userId).to.equal(1);
                done();
            });
    });
});
describe('/POST Create Saloon Owner', () => {
    it('Create User Testing', (done) => {
        let saloon = {
            'userName': 'he8',
            'saloonName': 'rferr',
            'location': 'errse',
            'type': 'saloon'
        }
        chai.request('http://localhost:3000')
            .post('/api/saloon')
            .send(saloon)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});
