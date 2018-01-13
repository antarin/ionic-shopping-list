import fb from 'firebase';

export class AuthService {
  signup(email: string, password: string) {
    return fb.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return fb.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    fb.auth().signOut();
  }
}
