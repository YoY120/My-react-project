import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommentTable from './CommentTable';
import CommentInformation from './CommentInformation';

const CommentPageRoute = () => {
	return (
		<Routes>
			<Route
				path='commentInformation/:commentId'
				element={<CommentInformation />}
			/>
			<Route path='/' element={<CommentTable />} />
		</Routes>
	);
};

export default CommentPageRoute;
