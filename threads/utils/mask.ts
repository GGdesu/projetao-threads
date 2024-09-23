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

export const formatPhoneNumber = (value: string | undefined) => {
    if(value != undefined) {
        const cleanedValue = value.replace(/\D/g, '');
        return cleanedValue
            .replace(/(\d{0})(\d)/, '$1($2')
            .replace(/(\d{1})(\d)/, '$1$2) ')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }
};

export const formatCep = (value: string | undefined) => {
    if(value != undefined) {
        const cleanedValue = value.replace(/\D/g, '');
        return cleanedValue
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2');
    }
};

export const formatDate = (value: string | undefined) => {
    if(value != undefined) {
        const cleanedValue = value.replace(/\D/g, '');
        return cleanedValue
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2');
    }
};