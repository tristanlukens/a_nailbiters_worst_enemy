import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const isLoggedIn: Writable<boolean> = writable(false);
export const firstName: Writable<string> = writable();
