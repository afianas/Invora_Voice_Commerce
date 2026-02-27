export const calculateCategory = (qty) => (qty > 100 ? 'A' : 'B');

export const formatProductName = (name) => {
    if (!name) return '';
    return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
};