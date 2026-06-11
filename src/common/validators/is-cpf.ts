import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator'

function isValidCPF(cpf: string): boolean {
    if (typeof cpf !== 'string') return false

    const cleaned = cpf.replace(/\D/g, '')

    return cleaned.length === 11
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    return isValidCPF(value)
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve conter 11 dígitos`
                },
            },
        })
    }
}