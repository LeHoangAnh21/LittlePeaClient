import { CategoryContext } from '~/actions/context/CategoryContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ManageCateItem({data}) {

	const {
		categoryState: { category, categories, categorysLoading },
		findCategoryId,
		setShowUpdateCategoryModal,
		setShowDeleteCategoryModal,
	} = useContext(CategoryContext)

	const chooseCategory = categoryId => {
		findCategoryId(categoryId)
		setShowUpdateCategoryModal(true)
	}

	const deleteCategory = categoryId => {
		findCategoryId(categoryId)
		setShowDeleteCategoryModal(categoryId)
	}

	return ( 
		<div>

			<Button onClick={chooseCategory.bind(this, data._id)}>
				<EditIcon />
			</Button>
			&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;
			<Button onClick={deleteCategory.bind(this, data._id)}>
				<DeleteIcon />
			</Button>
			
		</div>
	);
}

export default ManageCateItem;