export interface ListArgs {
	page?: number;
	limit?: number;
	sort?: string;
	filter?: { [key: string]: string };
}
