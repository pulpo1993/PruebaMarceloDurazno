import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Pelicula } from '../Model/pelicula';
@Injectable({
  providedIn: 'root'
})
export class ServicioPeliculasService {

  constructor(public afs: AngularFirestore) { }

  savePelicula(pelicula: Pelicula){
    const refContacto = this.afs.collection("peliculas");
    if(pelicula.uid==null){
      pelicula.uid = this.afs.createId();

    }
      

    refContacto.doc(pelicula.uid).set(Object.assign({}, pelicula), { merge: true})
  }

  getPeliculas(): Observable<any[]>{
    return this.afs.collection("peliculas",
            ref => ref.where("deleted", "==", false)).valueChanges();
  }

  async getContactoById(uid: string){
    try{
        let aux = await this.afs.collection("peliculas", 
            ref => ref.where('uid', '==', uid))
                      .valueChanges().pipe(first()).toPromise().then(doc => {                    	  
                          return doc;
                      }).catch(error => {
                          throw error;
                      });
        if(aux==null)
            return {};
        return aux[0];
    }catch(error){
      console.error("Error get peliculas ById", error);
      throw error;
    } 
  }

  getPeliculaById2(uid: string) :Observable<any>{
    return this.afs.collection("peliculas", 
            ref => ref.where('uid', '==', uid))
                      .valueChanges();
  }

  borrarPelicula(uid: string){
    const refContacto = this.afs.collection("peliculas");
    
    const aux = {deleted: true};
    refContacto.doc(uid).set( {...aux}, { merge: true})
  }
}
