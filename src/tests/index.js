import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { app } from '../index';

dotenv.config();
chai.use(chaiHttp);
chai.should();

describe('phonemmerce test suite', () => {
  describe('GET phones/search', () => {
    it('should return all buy requests', (done) => {
      chai.request(app)
        .get('/api/v1/phones/search?type=buyrequest')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          done();
        });
    });

    it('should return all sell requests', (done) => {
      chai.request(app)
        .get('/api/v1/phones/search?type=sellrequest')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          done();
        });
    });

    it('should filter and paginate sell request by name', (done) => {
      chai.request(app)
        .get('/api/v1/phones/search?type=sellrequest&search=iPhone XS Max&limit=5&page=2')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.data.phones.metadata.page.should.equal('2');
          res.body.data.phones.metadata.limit.should.equal('5');
          done();
        });
    });
  });

  describe('POST phones/sellrequest/save', () => {
    it('should return 409 if phone already exists', (done) => {
      chai.request(app)
        .post('/api/v1/phones/sellrequest/save')
        .send([
          {
            "name": "iPhone XS Max",
            "grade": "New",
            "storageSize": "64GB",
            "price": "$560"
          }
        ])
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(409);
          done();
        });
    });
  });
});
