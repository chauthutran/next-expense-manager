// utils/db.ts
import { openDB } from "idb";


const initDb = async () => {
	const db = await openDB('expense-database', 1, {
	  upgrade(db) {
		db.createObjectStore('expense-store');
	  },
	});
	return db;
};

export const saveData = async (key: string, data: any) => {
	if (typeof window !== 'undefined') {
		const db = await initDb();
		await db.put("expense-store", data, key);
	}
};

export const getData = async (key: string) => {
	if (typeof window !== 'undefined') {
		const db = await initDb();
		return await db.get("expense-store", key);
	}
};