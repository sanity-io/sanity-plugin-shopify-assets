export const extractName = (name: string): string => name?.split('/')?.pop()?.split('?')[0] ?? ''
