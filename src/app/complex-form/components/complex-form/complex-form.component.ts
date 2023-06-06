import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {ComplexFormService} from "../../services/complex-form.service";
import {validValidator} from "../../validators/valid.validator";
import {confirmEqualValidator} from "../../validators/confirm-equal.validator";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit{
  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(private fb: FormBuilder,
              private complexFormService: ComplexFormService) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initMainForm(): void {
    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }

  private initFormControls(): void {
    this.personalInfoForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });

    this.contactPreferenceCtrl = this.fb.control('email');

    this.emailCtrl = this.fb.control('');
    this.confirmEmailCrl = this.fb.control('');
    this.emailForm = this.fb.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    });

    this.phoneCtrl = this.fb.control('');

    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
    this.loginInfoForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
    );

    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    );

    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.emailCtrl.value && this.confirmEmailCrl.value)
    );

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => status === 'INVALID'
        && this.passwordCtrl.value &&
        this.confirmPasswordCtrl.value &&
      this.loginInfoForm.hasError('confirmEqual'))
    )
  }

  private setEmailValidators(showEmailCtrl: boolean): void {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([Validators.email, Validators.required]);
      this.confirmEmailCrl.addValidators([Validators.email, Validators.required]);
    } else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCrl.updateValueAndValidity();
  }

  private setPhoneValidators(showPhoneCtrl: boolean): void {
    if (showPhoneCtrl) {
      const phoneRegex = new RegExp(/^[0-9]+$/)
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.pattern(phoneRegex),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }

  onSubmitForm() {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved)
          this.resetForm();
        else
          console.error("Une erreur est survenue lors de l'envoie du formulaire");
      })
    ).subscribe();
  }

  private resetForm(): void {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
}
