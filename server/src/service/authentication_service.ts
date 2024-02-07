import * as bcrypt from 'bcrypt';

/**
 * This class handles authentication.
 */
class AuthenticationService {
  private static readonly SALT_ROUNDS = 10;

  /**
   * This function hashes user passwords, it is used for hashing the password before inserting it into the db.
   *
   * @param plainTextPassword this is the users password as it is in the service layer(i.e. after sanitization).
   * @return the hashed password, to be inserted into the db.
   */
  static async hashPassword(plainTextPassword: string): Promise<string> {
    try {
      return await bcrypt.hash(
        plainTextPassword,
        AuthenticationService.SALT_ROUNDS
      );
    } catch (error) {
      console.error('Hashing error:', error);
      throw error;
    }
  }
}

export {AuthenticationService};
