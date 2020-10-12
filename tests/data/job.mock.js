const month = new Date().getMonth() + 2;
const month2 = new Date().getMonth() + 3;
const someDate = `${month}-${new Date().getDay() + 2}-${new Date().getFullYear()}`;
const someDate2 = `${month2}-${new Date().getDay() + 5}-${new Date().getFullYear()}`;

export default {
  job1: {
    title: 'Web development',
    price: 1000000,
    yearsOfExperience: '2',
    jobType: 'full-time',
    startDate: someDate,
    endDate: someDate2,
    description: 'hello world',
    tag: '1,2,4',
  },
  job2: {
    title: 'Web development',
  },
  job3: {
    title: 'Web development',
    price: 1000000,
    yearsOfExperience: '2',
    jobType: 'full-time',
    startDate: someDate,
    endDate: someDate2,
    description: 'this is an ecommerce website',
    tag: '1,2,4',
  },
};
