import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Cours } from '../cours';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-inscrivisit',
  templateUrl: './inscrivisit.component.html',
  styleUrls: ['./inscrivisit.component.css']
})
export class InscrivisitComponent {
  registForm: FormGroup;

  constructor(private fb: FormBuilder, private visitService:VisitService,private router:Router) {}

  ngOnInit(): void {
    this.registForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:['',this.roleValidator]
    });
  }
  emailDomainValidator(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value as string;
  
    if (email && email.indexOf('@') !== -1) {
      const [, domain] = email.split('@');
      if (domain.indexOf('.') === -1) {
        return { emailDomain: true }; // Validation failed
      }
    }
    return null; // Validation passed
  }
  roleValidator(control: FormControl): { [key: string]: boolean } | null {
    const role = control.value as string;

    if (!role || (role !== 'admin' && role !== 'formateur' && role !== 'employe')) {
      return { invalidRole: true }; // Validation failed
    }

    return null; // Validation passed
  }
  onRegist(): void {
    this.visitService.regist(this.registForm.value).subscribe(data => console.log(data));
    this.router.navigate(['/connex']);
  }
  getErrorMessage(fieldName: string): string {
    const control = this.registForm.get(fieldName);
    if (control.touched && control.invalid) {
      if (control.hasError('required')) {
        return 'Ce champ est obligatoire';
      } else if (control.hasError('email')) {
        return 'Adresse email invalide';
      } else if (control.hasError('minlength')) {
        return 'Le mot de passe doit contenir au moins 6 caractères';
      } else if (control.hasError('emailDomain')) {
        return 'Domaine de messagerie invalide';
      }
      // Ajoutez d'autres conditions pour les erreurs spécifiques si nécessaire
    }
    return '';
  }  
}
