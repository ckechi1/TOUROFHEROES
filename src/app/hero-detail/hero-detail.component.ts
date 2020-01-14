import { Component, OnInit, Input } from '@angular/core';
import { hero }from '../hero'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service'; 

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: hero;
  
   
  constructor(private route : ActivatedRoute ,private location : Location , private heroService :HeroService) { }

  ngOnInit() {  

    this.getHero();
 
  } 
   
  goBack(): void {
    this.location.back();
  } 

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
}
