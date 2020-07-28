import handleProfile from '../../src/utils/HandleProfile';

const { githubUserData } = handleProfile;

describe('Test handleProfile functions in utils', () => {
  it('Should test githubUserData with invalid input', (done) => {
    githubUserData('')
      .then(data => {
        console.log('data :>> ', data);
        done();
      })
      .catch(error => {
        done();
      });
  });
});
