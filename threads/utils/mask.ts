export const formatCpf = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const formatCnpj = (value: string | undefined) => {
    if(value != undefined) {
        const cleanedValue = value.replace(/\D/g, '');
        return cleanedValue
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }
};