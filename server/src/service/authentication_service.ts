import * as bcrypt from 'bcrypt';

class AuthenticationService {
  static async hashPassword(plainTextPassword: string) {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(plainTextPassword, saltRounds);
    } catch (error) {
      console.error('Hashing error:', error);
      throw error;
    }
  }
}

export {AuthenticationService};
