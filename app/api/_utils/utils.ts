export function logErrorResponse(errorObj: unknown): void {
  console.log("API error response:");
  console.dir(errorObj, { depth: null });
}
// це лог, не devtool, кольори приберемо, спростимо код
