// "server-only" throws when imported outside a React Server Component graph,
// which breaks unit tests of otherwise-pure server modules. Alias it to a no-op.
export {};
