import { Injectable } from '@angular/core';
import { hero } from '../app/hero'; 
import { Observable, of, pipe  } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService { 
  private heroesUrl ='api/heroes'; 

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
  } 
 
  getHeroNo404<Data>(id: number): Observable<hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<hero>(`getHero id=${id}`))
      );
  } 

  getHeroes (): Observable<hero[]> {
    return this.http.get<hero[]>(this.heroesUrl)
      .pipe( 
        tap(_=>this.log('fetched heroes')),
        catchError(this.handleError<hero[]>('getHeroes', []))
      );
  }  

  getHero(id:number): Observable<hero>{ 
    const url =`${this.heroesUrl}/${id}`; 
    return this.http.get<hero>(url).pipe( 
      tap(_=>this.log(`fetched hero id=${id}`)), 
      catchError(this.handleError<hero>(`getHero id=${id}`))
    );
  }  

  updateHero (Hero : hero ):Observable<any>{ 
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe( 
      tap(_=>this.log(`updated hero id=${Hero.id}`)), 
      catchError(this.handleError<any>('updateHero'))
    );
  } 
   
  addHero(Hero:hero): Observable<hero>{ 
   return this.http.post<hero>(this.heroesUrl,Hero, 
    this.httpOptions).pipe( 
    tap((newHero:hero)=>this.log(`added hero W/ id=${newHero.id} `)), 
    catchError(this.handleError<hero>(`addHero`))  
    );
  } 
 
  deleteHero (Hero : hero | number ) : Observable<hero>{ 
   const id =typeof Hero ==='number'? Hero : Hero.id; 
   const url = `${this.heroesUrl}/${id}`; 
    
   return this.http.delete<hero>(url,this.httpOptions).pipe(
   tap(_=> this.log(`deleted hero id=${id}`)), 
   catchError(this.handleError<hero>('deleteHero'))
   ); 
  }
  
  searchHeroes(term:string): Observable<hero[]>{ 
    if(!term.trim()){ 
    return of ([]);
   } 
     return this.http.get<hero[]>(`${this.heroesUrl}/?name=${term}`) 
     .pipe(tap(_=>this.log(`found heroes macthing "${term}`)), 
     catchError(this.handleError<hero[]>('searchHeroes',[])) 
     );
  }   
   
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private log (message : string){ 
  this.messageService.add(`HeroService : ${message} `)
} 
 
  constructor(private messageService: MessageService , private http : HttpClient) { } 

}
