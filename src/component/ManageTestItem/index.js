
import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from "./ManageTestItem.module.scss";
import DescriptionIcon from '@material-ui/icons/Description';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TestContext } from '~/actions/context/TestContext';

const cx = classNames.bind(styles)

function ManagaTestItem({ data }) {

	const [hidden, setHidden] = useState(true);
	
	const handleClick = () => {
		setHidden(!hidden);
	};

	const {
		findTestId,
		setShowUpdateTestModal,
		setShowDeleteTestModal,
	} = useContext(TestContext)

	const chooseTest = testId => {
		findTestId(testId)
		setShowUpdateTestModal(true)
	}

	const deleteTest = testId => {
		findTestId(testId)
		setShowDeleteTestModal(true)
	}


	return ( 
		<div className={cx('test-item')}>
			<div className={cx('title')}>
				<div className={cx('title-header')} onClick={handleClick}>
					<div>
						<DescriptionIcon className={cx('icon')} />
					</div>
					<span>{data.title}</span>
				</div>
				<div className={cx('title-footer')}>
					<Button className={cx('button_edit')} onClick={chooseTest.bind(this, data._id)}>
						<EditIcon />
					</Button>

					<Button className={cx('button_delete')} onClick={deleteTest.bind(this, data._id)}>
						<DeleteIcon />
					</Button>
				</div>
			</div>
			<div className={cx({ hidden: hidden })}>
				<div className={cx('description')}>
					<span>{data.description || 'None'}</span>
				</div>
			</div>
		</div>
	);
}

export default ManagaTestItem;