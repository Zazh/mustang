import type { PageLoad } from './$types';
import { error, redirect, isRedirect, isHttpError } from '@sveltejs/kit';

interface Category {
    id: string | number;
    name: string;
    count: number;
}

interface Product {
    id: string | number;
    name: string;
    category_id: string | number;
    info: { photo?: string | null } | null;
}

export const load: PageLoad = async ({ fetch, params }) => {
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

        // 3. Перенаправление на первую категорию, если категория не существует
        //    (старые ссылки, удалённые категории, опечатки в URL)
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
        // redirect() и error() из SvelteKit бросают не Error, а служебные объекты —
        // их нужно пробросить дальше, иначе редирект превращается в страницу 500.
        if (isRedirect(e) || isHttpError(e)) throw e;
        console.error('Loader error:', e);
        throw error(500, 'Ошибка загрузки данных');
    }
};
