
import { CategoryContext } from '~/actions/context/CategoryContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { useEffect, useContext, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import classNames from 'classnames/bind';
import styles from './ManageCategory.module.scss'
import { Button, Toast } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import AddCategoryModal from './AddCategory';
import UpdateCategoryModal from './UpdateCategory';
import ManageCateItem from '~/component/ManageCateItem';
import DeleteCategoryModal from './DeleteCategory';

const cx = classNames.bind(styles)

function ManageCategory() {

	const {
		authState: { user: { role } },
	} = useContext(AuthContext)

	const {
		categoryState: { category, categories },
		getCategories,
		setShowAddCategoryModal,
		showToast: { show, message, type },
		setShowToast	
	} = useContext(CategoryContext)

	useEffect(() => {
		getCategories()
	}, [])

	let body = null

	if(role !== 'admin'){
		body = (
			<h1>Access denied</h1>
		)
	}else{
		if (categories.length === 0) {
			body = (
				<h1>No category posted.</h1>
			)
		} else {
			body = (
				<div>
	
					<h1>List of categories</h1>
	
					<Table striped bordered hover size="sm" className={cx('table')}>
						<thead>
							<tr>
								<th>Title</th>
								<th>Description</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>
								{categories.map((category) => {
									return (
									
										<tr>
											<td className={cx('col_title')}>{category.title}</td>
											<td className={cx('col_category')}>{category.description}</td>
											<td className={cx('col_options')}>
												<ManageCateItem key={category._id} data={category} />
											</td>
										</tr>
									)
								})}
						</tbody>
					</Table>
	
				</div>
			)
		}
	}


	return ( 
		<div>
			{body}

			{role === 'admin' && 
				<Fragment>
					<Fragment>
						<Button
							className={cx('btn-floating')}
							onClick={setShowAddCategoryModal.bind(this, true)}
						>
							<AddIcon />
						</Button>
					</Fragment>
		
					<AddCategoryModal />
		
					{category !== null && <UpdateCategoryModal />}
		
					{category !== null && <DeleteCategoryModal />}
				</Fragment>
			}

			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>

		</div>
	);
}

export default ManageCategory;