import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userdata = {
    email: '',
    displayName: ''
  }
  status = '';
  constructor(private afauth: AngularFireAuth, private afs: AngularFirestore) {

  }

  emailcheck($event) {
    let q = $event.target.value;
    if (q.trim() == '') {
      this.status = 'Email is required';
    }
    else {
      this.status = 'Checking.. !!'
      let collref = this.afs.collection('users').ref;
      let queryref = collref.where('email', '==', q);
      queryref.get().then((snapShot) => {
        if (snapShot.empty) {
          this.status = 'valid';
        }
        else {
          this.status = 'Email already registered in the system, please login.. !!'
        }
      })
    }
  }
}
