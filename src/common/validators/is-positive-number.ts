import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator'

export function IsPositiveNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isPositiveNumber',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: number) {
                    return typeof value === 'number' && value > 0
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve ser maior que 0`
                },
            },
        })
    }
}