import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';

chai.use(chaiHttp);
chai.should();

describe('welcome endpoint', () => {
  it('should return a welcome message', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        expect(message).to.equal('welcome to freelancerz');
        done();
      });
  });
});
