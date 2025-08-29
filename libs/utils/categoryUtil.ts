import { ICategory, JSONObject } from '@/libs/definations';

export const mapCategoriesById = (list: ICategory[] | null) =>
    (list || []).reduce((acc: any, category: any) => {
        acc[category.id] = category;
        return acc;
    }, {});


export const getCategoriesFromMap = (categoryMap: JSONObject | null) => (Object.values(categoryMap ?? {}) as ICategory[]);