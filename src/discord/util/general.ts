export function splitSpecialId(specialId: string) {
    const [feature, action, id] = specialId.split(':');

    return {feature, action, id}
}