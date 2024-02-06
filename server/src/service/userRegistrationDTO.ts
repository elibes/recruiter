/**
 * A DTO containing the information needed to register a user.
 * */
class UserRegistrationDTO {
  public readonly firstName!: string;
  public readonly lastName!: string;
  public readonly email!: string;
  public readonly personalIdentificationNumber!: string;
  public readonly username!: string;
  public readonly passwordHash!: string;

  /**
   * Creates the DTO.
   * @todo Use validators to sanitise the data.
   * */
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    personalIdentificationNumber: string,
    username: string,
    passwordHash: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.personalIdentificationNumber = personalIdentificationNumber;
    this.username = username;
    this.passwordHash = passwordHash;
  }
}

export default UserRegistrationDTO;
