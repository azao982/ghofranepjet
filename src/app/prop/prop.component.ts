import { Component } from '@angular/core';
import { CoursService } from '../cours.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Cours } from '../cours';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrls: ['./prop.component.css']
})
export class PropComponent {
  private listeCours: any[] = [];
  cours: Cours[] = [];
  selectedCourse: Cours | undefined;
  selectedCourse1: Cours | undefined;
  searchKeyword: string = '';
  constructor(private coursService: CoursService, private router: Router  ,private fb:FormBuilder) {}
  ngOnInit(): void {
    /*this.comForm = this.fb.group({
      com: '',
    });*/
    this.getCours();
  }
  private getCours(): void {
    this.coursService.getListeCours().subscribe(data => {
      this.cours = data;
    });
  }
  showDetails(course: Cours): void {
    this.selectedCourse = course;
  }
  inscrire(nomDuCours: string): void {
    console.log('Nom du cours inscrit :', nomDuCours);
    // Ajoutez ici le code pour gérer l'inscription au cours, par exemple, naviguez vers une autre page
    this.router.navigate(['/inscrivisit', nomDuCours]);
  }
  showDetails1(course: Cours): void {
    this.selectedCourse1 = course;
  }
  voir(){
    this.router.navigate(['/inscrivisit'])
  }
}
