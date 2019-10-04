import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from 'firebase';
import {map, take} from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;

export interface User {
    id?: string,
    name: string,
    email: string,
    senha: string
    cpf: string
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: Observable<User[]>;
    private userCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
        this.userCollection = this.afs.collection<User>('users');
        this.users = this.userCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
        );
    }

    getUsers(): Observable<User[]> {
        return this.users;
    }

  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
        take(1),
        map(user => {
          user.id = id;
          return user;
        })
    );
  }

    addUser(user: User): Promise<DocumentReference> {
        return this.userCollection.add(user);
    }

    updateUser(user: User): Promise<void> {
        return this.userCollection.doc(user.id).update({name: user.name, email: user.email, senha: user.senha, cpf: user.cpf});
    }

    deleteUser(id: string): Promise<void> {
        return this.userCollection.doc(id).delete();
    }

}
