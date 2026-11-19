export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
export function plural(count, singular, pluralForm = `${singular}s`) {
    return `${count} ${count > 1 ? pluralForm : singular}`;
}
