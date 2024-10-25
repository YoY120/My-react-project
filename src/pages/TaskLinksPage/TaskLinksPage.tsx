import React from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './taskLinksPage.module.scss';
import classNames from 'classnames';
import TaskListPage from './TaskListPage';
import TaskAdd from './TaskAdd';
import TaskInformation from './TaskInformation';
import TaskEdit from './TaskEdit';

/**
 * Основная страница
 */
const TaskLinksPage = () => {
	return (
		<div className={classNames(style.taskLinksPage)}>
			<div className={classNames(style.taskLinksPage_Wrapper)}>
				<Routes>
					<Route
						path='/taskInformation/:TaskById/*'
						element={<TaskInformation />}
					/>
					<Route path='/taskEdit/:TaskById' element={<TaskEdit />} />
					<Route path='/taskAdd' element={<TaskAdd />} />
					<Route path='/' element={<TaskListPage />} />
				</Routes>
			</div>
		</div>
	);
};

export default TaskLinksPage;
