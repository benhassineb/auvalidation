import 'core-js/es7/reflect';
import { TemplatingBindingLanguage, SyntaxInterpreter } from 'aurelia-templating-binding';
import { Parser } from 'aurelia-binding';
import { ViewResources } from 'aurelia-templating';

import {
    ValidationMessageParser,
    PropertyAccessorParser,
    ValidationRules,
    StandardValidator,
    ValidationMessageProvider,
    ValidationController,
    validateTrigger
} from 'aurelia-validation';

const parser = new Parser();
const templatingBindingLanguage = new TemplatingBindingLanguage(parser, null, new SyntaxInterpreter());
const messageParser = new ValidationMessageParser(templatingBindingLanguage);
const propertyParser = new PropertyAccessorParser();
ValidationRules.initialize(messageParser, propertyParser);
const validator = new StandardValidator(new ValidationMessageProvider(messageParser), new ViewResources());
const propertyAccessorParser = new PropertyAccessorParser(parser);
const validationController = new ValidationController(validator, propertyAccessorParser);
validationController.validateTrigger = validateTrigger.manual;


export class Person {
    constructor() {

        this.firstName;
        this.lastName;
        this.email;
    }
}

export const PersonValidationRules = () => ValidationRules
    .ensure('firstName').required()
    .ensure('lastName').required()
    .ensure('email').email();



PersonValidationRules().on(Person);

let person = new Person();

validationController.validate({ object: person }).then(results => {
    // console.log(results);
    console.log(validationController.errors);
});


// validator.validateObject(person, PersonValidationRules().rules)
//     .then(results => {
//         console.log(results);
//     });
