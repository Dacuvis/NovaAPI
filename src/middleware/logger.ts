export function Logger( { method, path}: { method: string, path: string } ) {
    console.log(`[${new Date().toISOString()}] ${method} ${path}`);
}