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
describe('/DELETE above User', () => {
    it('delete User by mail testing', (done) => {
        chai.request('http://localhost:3000')
            .delete('/api/userByEmail/erf@frse.com')
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});
describe('/GET User Id by email', () => {
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
// describe('/POST Create Saloon Owner', () => {
//     it('Create User Testing', (done) => {
//         let saloon = {
//             'userName': 'he8',
//             'saloonName': 'rferr',
//             'location': 'errse',
//             'type': 'saloon'
//         }
//         chai.request('http://localhost:3000')
//             .post('/api/saloon')
//             .send(saloon)
//             .end((err, res) => {
//                 chai.expect(res.status).to.equal(200);
//                 done();
//             });
//     });
// });
// describe('/POST Create Stylist', () => {
//     it('Create Stylist Testing', (done) => {
//         let stylist = {
//             'userName': 'he81',
//             'type': 'stylist'
//         }
//         chai.request('http://localhost:3000')
//             .post('/api/stylist')
//             .send(stylist)
//             .end((err, res) => {
//                 chai.expect(res.status).to.equal(200);
//                 done();
//             });
//     });
// });
describe('/POST authenticate User', () => {
    it('Verify User Testing', (done) => {
        let user = {
            'email': 'chamaraliyanage604@gmail.com',
            'password': 'da'
        }
        chai.request('http://localhost:3000')
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res.body.user).to.equal(null);
                done();
            });
    });
});
describe('/GET stylist data', () => {
    it('GET stylist data Testing', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/stylist/1')
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});
describe('/GET saloon data', () => {
    it('GET saloon data Testing', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/saloon/1')
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});
// describe('/PUT User', () => {
//     it('Update stylist data Testing', (done) => {
//         let user = {
//             'email': 'chamaraliyafdfdfeg3nage604@gmail.com',
//             'password': 'da'
//         }
//         chai.request('http://localhost:3000')
//             .put('/api/stylist/1')
//             .send(user)
//             .end((err, res) => {
//                 chai.expect(res.status).to.equal(200);
//                 done();
//             });
//     });
// });
describe('/GET stylist data by charges rate', () => {
    it('GET stylist data Testing', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/stylist/100')
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
});

// describe('/DELETE stylist data', () => {
//     it('Delete stylist data Testing', (done) => {
//         let user = {
//             'email': 'chamaraliyafdfdfeg3nage604@gmail.com',
//             'password': 'da'
//         }
//         chai.request('http://localhost:3000')
//             .put('/api/stylist/1')
//             .send(user)
//             .end((err, res) => {
//                 chai.expect(res.status).to.equal(200);
//                 done();
//             });
//     });
// });