import { Injectable } from '@angular/core';
import { hero } from '../app/hero'; 
import { Heroes }from '../app/mock-heores'; 
import { Observable, of  } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
getHeroes() :Observable <hero[]> {  
  this.messageService.add('HeroService:fetched heroes');
  return of(Heroes);
}
 
getHero(id : number) : Observable<hero> { 
  this.messageService.add(`HeroService fetch hero id${id}`); 
  return of(Heroes.find(hero => hero.id===id)); 

} 

  constructor(private messageService: MessageService) { }
}
