import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class FormlyService {
  private emailConfig: FormlyFieldConfig = {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email',
      required: true,
      pattern: "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"
    },
    validation: {
      messages: {
        pattern: 'Adresă de email invalidă.',
      }
    }
  }

  private passwordConfig: FormlyFieldConfig = {
    key: 'password',
    type: 'input',
    templateOptions: {
      label: 'Parolă',
      type: 'password',
      required: true,
      minLength: 6,
    },
  }

  constructor(private authenticationService: AuthenticationService) {
  }

  private simpleInputConfig(key: string, label: string, required = true, minLength = 3) {
    return {
      key,
      type: 'input',
      templateOptions: {
        label,
        required,
        minLength,
      },
    }
  }

  private dateInputConfig(key: string, label: string, required = true) {
    return {
      key,
      type: 'datepicker',  // TODO: Implement date picker
      templateOptions: {
        label,
        required,
      },
    }
  }

  private get matchPasswordsConfig() {
    return {
      key: 'password',
      validators: {
        fieldMatch: {
          expression: (control) => {
            const value = control.value;

            return value.passwordConfirm === value.password
              // avoid displaying the message error when values are empty
              || (!value.passwordConfirm || !value.password);
          },
          message: 'Parolele nu coincid.',
          errorPath: 'passwordConfirm',
        },
      },
      fieldGroup: [
        this.passwordConfig,
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirmă parola',
            required: true,
          },
        },
      ],
    }
  }

  public get loginConfig(): FormlyFieldConfig[] {
    return [
      this.emailConfig,
      this.passwordConfig,
    ];
  }

  public get registerConfig(): FormlyFieldConfig[] {
    return [
      this.simpleInputConfig('firstName', 'Nume'),
      this.simpleInputConfig('lastName', 'Prenume'),
      this.emailConfig,
      this.matchPasswordsConfig,
    ];
  }

  public get testConfig(): FormlyFieldConfig[] {
    const config: FormlyFieldConfig[] = [
      this.simpleInputConfig('id', 'ID', true, 0), // TODO: Add unique validator
      this.simpleInputConfig('youtubeVideoLink', 'Youtube link', false),
      this.dateInputConfig('dueDate', 'Data expirării testului')
    ];

    if (!this.authenticationService.isLoggedIn()) {
      config.push(this.emailConfig);
    }

    return config;
  }
}
