import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommentTable from './CommentTable';

const CommentPageRoute = () => {
	return (
		<Routes>
			<Route path='/' element={<CommentTable/>} />
		</Routes>
	);
};

export default CommentPageRoute;
