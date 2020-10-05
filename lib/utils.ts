export function firstArrayElement(arrOrString: string[] | string): string {
  return Array.isArray(arrOrString) ? arrOrString[0] : arrOrString
}