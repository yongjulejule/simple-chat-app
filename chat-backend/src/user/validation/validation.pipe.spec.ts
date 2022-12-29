import { ValidationPipe } from './validation.pipe';
import { Encrypter } from '../../lib/encrypter';

describe('ValidationPipe', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = new ValidationPipe(new Encrypter());
  });
  it('should be defined', () => {
    expect(pipe.transform).toBeDefined();
  });
});
