import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";

@Injectable({
  providedIn: 'root'
})
export class FormlyService {

  constructor() {
  }

  public get loginConfig(): FormlyFieldConfig[] {
    return [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Introdu adresa de email',
          required: true,
          pattern: "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"
        },
        validation: {
          messages: {
            pattern: 'Nu este o adresă validă de email.',
            required: 'Câmp obligatoriu.'
          }
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Parolă',
          type: 'password',
          placeholder: 'Introdu parola',
          required: true,
        },
        validation: {
          messages: {
            required: 'Câmp obligatoriu.'
          }
        }
      }
    ];
  }
}
