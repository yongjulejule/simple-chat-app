import * as bcrypt from 'bcrypt';

export class Encrypter {
  private saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
