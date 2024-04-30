import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  ngOnInit(): void {}
  user = {
    name: 'Islam',
    email: 'cokuen@gmail.com',
  };
  fb = inject(FormBuilder);

  myForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(7), Validators.minLength(3)],
    ],
    email: ['', Validators.required],
  });
}
