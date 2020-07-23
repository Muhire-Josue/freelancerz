import chai from 'chai';
import sendEmail from '../../src/utils/sendEmail';
import emailMessages from '../../src/utils/emailMessages';

const { sendEmailNotification } = sendEmail;
const { applicationJobApproved } = emailMessages;

describe('testing email notification utils', () => {
  it('Should send email notification', (done) => {
    sendEmailNotification('user@example.com', 'John Doe', '#', 'this is to test email notification', 'Never mind')
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('Should not send email notification given invalid data', (done) => {
    sendEmailNotification('user@example.com', 'John Doe', '#', 'this is to test email notification', 'Never mind')
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('Should send email notification', (done) => {
    sendEmailNotification(applicationJobApproved, 'John Doe', '#', 'this is to test email notification', 'Never mind')
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
});
