import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommentTable from './CommentTable';
import CommentInformation from './CommentInformation';
import CommentAdd from './CommentAdd';
import CommentEdit from './CommentEdit';

/**
 * Ссылки на компоненты комментариев
 */
const CommentPageRoute = () => {
	return (
		<Routes>
			<Route path='commentAdd' element={<CommentAdd />} />
			<Route
				path='commentInformation/:commentId'
				element={<CommentInformation />}
			/>
			<Route path='commentEdit/:commentId' element={<CommentEdit />} />
			<Route path='/' element={<CommentTable />} />
		</Routes>
	);
};

export default CommentPageRoute;
