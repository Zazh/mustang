import type { PageLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

interface Category {
    id: string | number;
    name: string;
    count: number;
}

interface Product {
    id: string | number;
    name: string;
    category_id: string | number;
}

export const load: PageLoad = async ({ fetch, params, url }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || '';

    try {
        // 1. Загрузка всех категорий
        const categoriesResponse = await fetch(`${baseUrl}/products/categories/`);
        if (!categoriesResponse.ok) throw new Error('Categories fetch failed');
        const categories: Category[] = await categoriesResponse.json();

        if (!categories?.length) {
            return { products: [], categories: [], categoryCounts: {} };
        }

        // 2. Находим текущую категорию по ID из параметров пути
        const categoryId = params.categoryId;
        const currentCategory = categories.find(c => c.id.toString() === categoryId);

        // 3. Перенаправление если категория не существует
        if (!currentCategory) {
            throw redirect(307, `/products/${categories[0].id}`);
        }

        // 4. Загрузка продуктов с фильтрацией по имени категории
        const productsResponse = await fetch(
            `${baseUrl}/products/products/?category__name=${encodeURIComponent(currentCategory.name)}`
        );

        if (!productsResponse.ok) {
            const errorText = await productsResponse.text();
            throw new Error(`Products fetch failed: ${errorText}`);
        }

        const products: Product[] = await productsResponse.json();

        return {
            products,
            categories,
            activeCategory: categoryId,
            categoryCounts: categories.reduce((acc, c) => {
                acc[c.id] = c.count;
                return acc;
            }, {} as Record<string | number, number>)
        };
    } catch (e) {
        console.error('Loader error:', e);
        if (e instanceof Error && e.message.includes('Redirect')) throw e;
        throw error(500, 'Ошибка загрузки данных');
    }
};