import React from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './taskLinksPage.module.scss';
import classNames from 'classnames';
import TaskListPage from './TaskListPage';

/**
 * Основная страница
 */
const TaskLinksPage = () => {
	return (
		<div className={classNames(style.taskLinksPage)}>
			<Routes>
				<Route path='/' element={<TaskListPage />} />
			</Routes>
		</div>
	);
};

export default TaskLinksPage;
