export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount)
}

export const toBoolean = (str : string) => {
    return str.toLocaleLowerCase() === 'true' 
}