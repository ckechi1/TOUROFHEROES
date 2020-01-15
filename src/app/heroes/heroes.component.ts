import { Component, OnInit } from '@angular/core';
import { hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
       
     heroes: hero[];

     constructor(private heroeService : HeroService) { }

     ngOnInit() {
       this.getHeroes();
     }
           
      getHeroes() : void { 
      this.heroeService.getHeroes().subscribe(heroes => this.heroes = heroes);
     } 
      
     add(name : string ):void { 
       name=name.trim(); 
       if(!name){return ;} 
       this.heroeService.addHero({name} as hero) 
       .subscribe(hero =>{ 
         this.heroes.push(hero);
       })
     } 
      
     delete(Hero : hero): void { 
       this.heroes = this.heroes.filter(h => h!== Hero); 
       this.heroeService.deleteHero(Hero).subscribe();
     }
}
