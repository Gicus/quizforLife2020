import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <div [formlyAttributes]="field">
      <div class="input-group">
        <input [formControl]="formControl" class="form-control" placeholder="yyyy-mm-dd"
               name="dp" ngbDatepicker #d="ngbDatepicker"
        >
        
        <div class="input-group-append">
          <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button"></button>
        </div>
      </div>
    </div>
`,
})
export class DatepickerInput extends FieldType {}
