var expect = require('expect');

describe('Testing message generation' , () => {
  it('Should generate message' , (done) => {
      const {generateMessage} = require('./message');
      var res = generateMessage("Admin" , "Welcome to the struggle");
      expect(res.from).toBe('Admin');
      expect(res.text).toBe("Welcome to the struggle");
      expect(res.createdAt).toBeA('number');
      done();
  });
});
