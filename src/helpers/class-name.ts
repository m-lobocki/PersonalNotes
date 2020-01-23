export function c(literals: TemplateStringsArray, ...placeholders: ({ [key: string]: any } | any)[]): string {
    const classes: string[] = [];
    for (const item of placeholders) {
        if (typeof item === 'object' && item !== null) {
            for (const [className, boolean] of Object.entries(item)) {
                if (boolean) {
                    classes.push(className);
                }
            }
        } else {
            if (item) {
                classes.push(item);
            }
        }
    }
    return literals.filter(literal => literal.trim()).join(' ') + classes.join(' ');
}
