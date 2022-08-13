import { TypeCheckerPipe } from './type-checker.pipe';

class TestClassA {}

class TestClassB {}

describe('TypeCheckerPipe', () => {
  const pipe = new TypeCheckerPipe();

  for (const testCase of [
    {
      description: 'failure',
      obj: new TestClassA(),
      type: TestClassB,
      expectedValue: undefined,
    },
    {
      description: 'success',
      obj: new TestClassA(),
      type: TestClassA,
      expectedValue: new TestClassA(),
    },
  ]) {
    it(`validates class instance and returns ${testCase.description}`, () => {
      const result = pipe.transform(testCase.obj, testCase.type);
      expect(result).toEqual(testCase.expectedValue);
    });
  }
});
