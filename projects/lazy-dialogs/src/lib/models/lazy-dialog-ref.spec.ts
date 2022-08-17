import { LazyDialogRef } from './lazy-dialog-ref';

describe('LazyDialogRef', () => {
  describe('is provided with componentRef and moduleRef', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      containerComponentRefSpy = jasmine.createSpyObj('containerComponentRef', [
        'destroy',
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      moduleRefSpy = jasmine.createSpyObj('moduleRef', ['destroy']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      lazyDialogRef = new LazyDialogRef(containerComponentRefSpy, moduleRefSpy);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let containerComponentRefSpy: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let moduleRefSpy: any;
    let lazyDialogRef: LazyDialogRef<unknown>;

    it('triggers onClose() when close(...) is being called with data', (done) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      lazyDialogRef.onClose().then((data) => {
        expect(data).toEqual({ test: 'data' });
        done();
      });

      lazyDialogRef.close({ test: 'data' });
    });

    it('triggers onClose() when close(...) is being called without data', (done) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      lazyDialogRef.onClose().then((data) => {
        expect(data).toBeUndefined();
        done();
      });

      lazyDialogRef.close();
    });

    it('triggers destroy() when close(...) is being called with data', () => {
      lazyDialogRef.close({ test: 'data' });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(containerComponentRefSpy.destroy).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(moduleRefSpy.destroy).toHaveBeenCalledTimes(1);
    });

    it('triggers destroy() when close(...) is being called without data', () => {
      lazyDialogRef.close();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(containerComponentRefSpy.destroy).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(moduleRefSpy.destroy).toHaveBeenCalledTimes(1);
    });
  });

  describe('is provided with componentRef', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      containerComponentRefSpy = jasmine.createSpyObj('containerComponentRef', [
        'destroy',
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      lazyDialogRef = new LazyDialogRef(containerComponentRefSpy);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let containerComponentRefSpy: any;
    let lazyDialogRef: LazyDialogRef<unknown>;

    it('triggers onClose() when close(...) is being called with data', (done) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      lazyDialogRef.onClose().then((data) => {
        expect(data).toEqual({ test: 'data' });
        done();
      });

      lazyDialogRef.close({ test: 'data' });
    });

    it('triggers onClose() when close(...) is being called without data', (done) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      lazyDialogRef.onClose().then((data) => {
        expect(data).toBeUndefined();
        done();
      });

      lazyDialogRef.close();
    });

    it('triggers destroy() when close(...) is being called with data', () => {
      lazyDialogRef.close({ test: 'data' });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(containerComponentRefSpy.destroy).toHaveBeenCalledTimes(1);
    });

    it('triggers destroy() when close(...) is being called without data', () => {
      lazyDialogRef.close();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(containerComponentRefSpy.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
