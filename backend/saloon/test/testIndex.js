var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/POST Create Stylist', () => {
    it('Create Stylist Testing', (done) => {
        let stylist = {
            'userName': 'he8',
            'password': 'rferr',
            'email': 'erf@frse.com'
            
        }
        chai.request('http://localhost:3000')
            .post('/api/stylists')
            .send(stylist)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});