import { useState, createContext, useReducer } from 'react';
import { apiURL } from '~/api/request';
import { categoryReducer } from '~/actions/reducers/categoryReducer'
import axios from 'axios';
import {
	GET_CATEGORY,
	ADD_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	FIND_CATEGORY_ID,
} from './constant';

export const CategoryContext = createContext()

const CategoryContextProvider = ({ children }) => {

	const [categoryState, dispatch] = useReducer(categoryReducer, {
		category: null,
		categories: [],
		categoriesLoading: true
	})

	//Get category 
	const getCategories = async () => {
		try {
			const response = await axios.get(`${apiURL}/categories`)
			if (response) {
				dispatch({ type: GET_CATEGORY, payload: response.data })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	//Add category
	const addCategory = async newCategory => {
		try {
			const response = await axios.post(`${apiURL}/categories/create`, newCategory)

			if (response.data.success) {
				dispatch({ type: ADD_CATEGORY, payload: response.data.category })
				return response.data;
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}

	}

	//Find Category id
	const findCategoryId = categoryId => {
		const category = categoryState.categories.find(category => category._id === categoryId)
		dispatch({ type: FIND_CATEGORY_ID, payload: category })
	}

	//Delete Category
	const deleteCategory = async categoryId => {
		try {
			const response = await axios.delete(`${apiURL}/categories/${categoryId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_CATEGORY, payload: categoryId })
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Update Category
	const updateCategory = async updatedCategory => {
		try {
			const response = await axios.put(`${apiURL}/categories/${updatedCategory._id}`, updatedCategory)
			if (response.data.success) {
				dispatch({ type: UPDATE_CATEGORY, payload: response.data.category })
				return response.data
			}
		} catch (err) {
			return err.response.data ? err.response.data : { success: false, message: 'server error' }
		}
	}

	const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
	const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);

	const categoryContextData = {
		categoryState,
		getCategories,
		showAddCategoryModal,
		setShowAddCategoryModal,
		addCategory,
		deleteCategory,
		showDeleteCategoryModal,
		setShowDeleteCategoryModal,
		updateCategory,
		findCategoryId,
		showUpdateCategoryModal,
		setShowUpdateCategoryModal,
	}

	return (
		<CategoryContext.Provider value={categoryContextData}>
			{children}
		</CategoryContext.Provider>
	)

}

export default CategoryContextProvider;
