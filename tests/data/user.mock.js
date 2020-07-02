const month = new Date().getMonth() + 1;
const month2 = new Date().getMonth() + 2;
const someDate = `${month}-${new Date().getDay()}-${new Date().getFullYear()}`;
const someDate2 = `${month2}-${new Date().getDay()}-${new Date().getFullYear()}`;
export default {
  user1: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'user2@example.com',
    password: 'User#example11',
    phoneNumber: '0785505790',
    userTypeId: 1
  },
  clientSignup: {
    firstName: 'Sara',
    lastName: 'Smith',
    email: 'sara@example.com',
    password: 'User#example11',
    phoneNumber: '0785505790',
    userTypeId: 2
  },
  user2: {
    firstName: 'Jane'
  },
  loginUser1: {
    email: 'user@example.com',
    password: 'User#example11',
  },
  invalidLogin: {
    email: 'invaliduser@example.com',
    password: 'User#example11',
  },
  invalidLogin2: {
    email: 'user@example.com',
    password: 'User#example12',
  },
  invalidLogin3: {
    email: 'user@example.com',
    password: 'invalidPass',
  },
  loginUser4: {
    email: 'user2@example.com',
    password: 'User#example11',
  },
  job1: {
    title: 'Web development',
    price: 1000000,
    yearsOfExperience: '2',
    jobType: 'full-time',
    startDate: someDate,
    endDate: someDate2,
    description: 'hello world'
  },
  job2: {
    title: 'Web development',
  },
  clientLogin: {
    email: 'client@example.com',
    password: 'User#example11',
  },
};
