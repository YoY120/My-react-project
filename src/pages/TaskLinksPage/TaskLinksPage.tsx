import React from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './taskLinksPage.module.scss';
import classNames from 'classnames';
import TaskListPage from './TaskListPage';
import TaskAdd from './TaskAdd';

/**
 * Основная страница
 */
const TaskLinksPage = () => {
	return (
		<div className={classNames(style.taskLinksPage)}>
			<div className={classNames(style.taskLinksPage_Wrapper)}>
				<Routes>
					<Route path='/taskAdd' element={<TaskAdd />} />
					<Route path='/' element={<TaskListPage />} />
				</Routes>
			</div>
		</div>
	);
};

export default TaskLinksPage;
