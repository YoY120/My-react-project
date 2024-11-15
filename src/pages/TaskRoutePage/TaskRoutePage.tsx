import React from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './taskRoutePage.module.scss';
import classNames from 'classnames';
import TaskTablePage from './TaskTablePage';
import TaskAdd from './TaskAdd';
import TaskInformation from './TaskInformation';
import TaskEdit from './TaskEdit';

/**
 * Основная страница
 */
const TaskRoutePage = () => {
	return (
		<div className={classNames(style.taskRoutePage)}>
			<div className={classNames(style.taskRoutePage_Wrapper)}>
				<Routes>
					<Route
						path='/taskInformation/:TaskId/*'
						element={<TaskInformation />}
					/>
					<Route path='/taskEdit/:TaskId' element={<TaskEdit />} />
					<Route path='/taskAdd' element={<TaskAdd />} />
					<Route path='/' element={<TaskTablePage />} />
				</Routes>
			</div>
		</div>
	);
};

export default TaskRoutePage;
