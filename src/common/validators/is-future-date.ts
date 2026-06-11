import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator'

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFutureDate',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    const date = new Date(value)
                    return date.getTime() > new Date().getTime()
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve ser uma data futura`
                },
            },
        })
    }
}