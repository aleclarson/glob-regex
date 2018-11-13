export type GlobParser = (glob: string | string[]) => RegExp
declare const globRegex: GlobParser
export default globRegex
