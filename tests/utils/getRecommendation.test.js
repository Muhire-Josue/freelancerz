import chai, { expect } from 'chai';
import getRecommendations from '../../src/utils/getRecommendations';
import recommendationMock from '../data/recommendation.mock';

chai.should();

const {
  getDevSkillsPercentage,
  getDevRecommendation,
  getRecommendationForAllApplicants,
} = getRecommendations;

describe('Test getRecommendation functions', () => {
  it('it should test getDevSkillsPercentage', (done) => {
    const data = getDevSkillsPercentage(['1', '2', '3'], ['1', '2', '3']);
    expect(data).to.equal(100);
    done();
  });
  it('it should test getDevRecommendation', (done) => {
    const data = getDevRecommendation(['1', '2', '3'], ['1', '2', '3']);
    expect(data).to.equal('High');
    done();
  });
  it('it should test getDevRecommendation', (done) => {
    const data = getDevRecommendation(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], ['12']);
    done();
  });
  it('it should test getDevRecommendation', (done) => {
    const data = getDevRecommendation(['1', '2', '3', '4'], ['1', '2']);
    expect(data).to.equal('Medium');
    done();
  });
  it('it should test getRecommendationForAllApplicants', (done) => {
    const data = getRecommendationForAllApplicants(recommendationMock);
    expect(data).to.be.an('array');
    done();
  });
});
