import React, { useMemo } from 'react';

/**
 * Функция, для поиска по таблицам
 * @param arr - массив данных
 * @param searchText - вводимый текст
 * @param key - ключи
 * @returns возвращает новый массив с учетом результата поиска
 */
const useSearchData = <T extends {}, K extends keyof T>(
	arr: T[],
	searchText: string | null,
	key: K
) => {
	return useMemo(() => {
		return arr.filter(
			item =>
				item[key] &&
				String(item[key])
					.toLowerCase()
					.includes((searchText || '').toLowerCase())
		);
	}, [arr, searchText, key]);
};

export default useSearchData;
