import { ICategory, ResponseData, SearchFilters } from '@/libs/definations';
import { sendRequest } from './requestService';
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, GET_CATEGORY_BY_ID, UPDATE_CATEGORY } from '@/libs/graphql/queries/category';

export const CategoryService = {
    findCategoryById: async (id: string): Promise<ResponseData> => {
        return sendRequest(GET_CATEGORY_BY_ID, { id }, 'findCategoryById');
    },
    findAll: async (): Promise<ResponseData> => {
        return sendRequest(GET_CATEGORIES, {}, 'findAll');
    },
    save: async (data: ICategory): Promise<ResponseData> => {
        // Create new category
        if (!data.id || data.id === '') {
            return sendRequest(CREATE_CATEGORY, data, 'createCategory');
        }

        // Update existing category
        return sendRequest(UPDATE_CATEGORY, data, 'updateCategory');
    },
    delete: async (id: string): Promise<ResponseData> => {
        return sendRequest(DELETE_CATEGORY, { id }, 'deleteCategory');
    },
    createEmptyCategory: (): ICategory => ({
        name: '',
        description: '',
        color: '',
        icon: '',
    } as ICategory),
};
