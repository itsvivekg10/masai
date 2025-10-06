class User {
  protected username: string;

  constructor(username: string) {
    this.username = username;
  }
}

class Admin extends User {
  showUsername(): void {
    console.log(`Admin username is: ${this.username}`);
  }
}

const admin = new Admin("VivekGupta");
admin.showUsername();