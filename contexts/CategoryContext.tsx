'use client';

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';
import { ICategory, JSONObject } from '@/libs/definations';
import * as Utils from '@/utils';
import * as Constant from '@/libs/constants';;
import { mapCategoriesById } from '@/utils/categoryUtil';
import { CategoryService } from '@/services/categoryService';

// categoryMap : { <category-id-1>: <category data>, ...}
interface CategoryContextProps {
    categoryMap: JSONObject;
    saveCategory: (category: ICategory) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
    error: string | null;
    loading: boolean;
    newCategory: ICategory | null; // After adding new category or after updating, the new category will be set here
}

const CategoryContext = createContext<CategoryContextProps>({
    categoryMap: {},
    saveCategory: async (category: ICategory) => {},
    deleteCategory: async (categoryId: string) => {},
    error: null,
    loading: false,
    newCategory: null
});

export const useCategory = (): CategoryContextProps =>
    useContext(CategoryContext);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState<ICategory | null>(null);
    const [categoryMap, setCategoryMap] = useState<JSONObject>({});

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        const response = await CategoryService.findAll();
        if (response.success) {
            const list = response.data;
            setCategoryMap(mapCategoriesById(list));
        } else {
            setError(response.message!);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        if (Object.keys(categoryMap).length === 0) {
            fetchData();
        }
    }, []);

    const saveCategory = async (category: ICategory) => {
        setLoading(true);
        setError(null);

        const response = await CategoryService.save(category);
        if(response.success) {
            setNewCategory( response.data);
        }
        else {
            setError(response.message!);
        }
        setLoading(false);
    };

    const deleteCategory = async (categoryId: string) => {
        setLoading(true);
        setError(null);

        const response = await CategoryService.delete(categoryId);
        if(response.success) {
            setNewCategory( response.data);
        }
        else {
            setError(response.message!);
        }
        setLoading(false);
    };

    return (
        <CategoryContext.Provider
            value={{
                loading,
                error,
                categoryMap,
                saveCategory,
                deleteCategory,
                newCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
