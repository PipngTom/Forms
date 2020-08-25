import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dynamicJSON = [
    {
      "key": "first_name",
      "label": "First Name",
      "type": "text",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Name required !"
        },
        {
          "name": "pattern",
          "validator": "^[a-zA-Z]+$",
          "message": "Accept only text !"          
        }
      ]
    },
    {
      "key": "last_name",
      "label": "Last Name",
      "type": "text",
      "value": "",
      "required": true
    },
    {
      "key": "email_key",
      "label": "Email",
      "type": "email",
      "value": "",
      "required": true
    },
    {
      "key": "password_key",
      "label": "Password",
      "type": "password",
      "value": "",
      "required": true
    },
    {
      "key": "radio_key",
      "label": "Gender",
      "type": "radio",
      "value": "",
      "required": true,
      "options": [
        "Male", "Female"
      ]
    },
    {
      "key": "select_key",
      "label": "Current residence",
      "type": "select",
      "value": "",
      "required": false,
      "options": [
      "Belgrade", "Vrbas"
      ]
    },
    {
      "key": "checkbox_key",
      "label": "Are you not a robot ?",
      "type": "checkbox",
      "value": "",
      "required": false
    }
  ];

  userProfileForm: FormGroup;

  constructor( private fb: FormBuilder) {}

  ngOnInit() {
    // this.userProfileForm = this.fb.group({
    //   fields: this.fb.array([])
    // })
    // this.dynamicJSON.forEach(item => {
    //   let fields = <FormArray>this.userProfileForm.controls['fields'];
    //   fields.push(this.fb.group({
    //     [item.label]: ['']
    //   })) 
    // });
    const controls = {};
    this.dynamicJSON.forEach(item => {
      const validationArray = [];
      if(item.validations){
        //console.log(item.validations)
        item.validations.forEach(value => {
          if (value.name === "required") {
            validationArray.push(
              Validators.required
            )
          }
          if (value.name === "pattern") {
            validationArray.push(
              Validators.pattern(value.validator)
            )
          }
        })
      }
      
      controls[item.label] = new FormControl('', validationArray);
    })
    this.userProfileForm = new FormGroup(
      controls
    );
  }

  onSubmit() {
    console.log(this.userProfileForm.value);
  }
}
