
import { RecruitmentContext } from '~/actions/context/RecruitmentContext';
import { CategoryContext } from '~/actions/context/CategoryContext';
import { useContext } from 'react';
import { CardMedia } from "@material-ui/core";
import classNames from "classnames/bind";
import { Fragment } from 'react';
import styles from "./Recruitment.module.scss"
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function RecruitmentItem({ data }) {

	const {
		categoryState: { categories },
	} = useContext(CategoryContext)

	const {
		findRecruitmentId,
		setShowUpdateRecruitmentModal,
		setShowDeleteRecruitmentModal,
	} = useContext(RecruitmentContext)

	const chooseRecruitment = recruitmentId => {
		findRecruitmentId(recruitmentId)
		setShowUpdateRecruitmentModal(true)
	}

	const deleteRecruitment = recruitmentId => {
		findRecruitmentId(recruitmentId)
		setShowDeleteRecruitmentModal(true)
	}

	return (

		<Fragment>
			<div className={cx('recruit_item')} >
				<div className={cx('recruit_avatar')}>
					<CardMedia image={data.image || ''} title='Title' className={cx('media')} />
					
					<Link to={`/recruitment/${data._id}`} className={cx('button_learn')}>
						<Button>
							View now
						</Button>
					</Link>
					<Button className={cx('button_edit')} onClick={chooseRecruitment.bind(this, data._id)}>
						<EditIcon />
					</Button>

					<Button className={cx('button_delete')} onClick={deleteRecruitment.bind(this, data._id)}>
						<DeleteIcon />
					</Button>

				</div>

				<div className={cx('body-recruitItem')}>
					<Link to={`/recruitment/${data._id}`} className={cx('link')}>
						<h5 className={cx('title')}>{data.title}</h5>
					</Link>
					<span className={cx('category')}>
						{/* {categories.map((category) => {
							let categoryTitle = null
							if (category._id === data.category) {
								categoryTitle = category.title
							}
							return categoryTitle
						})} */}
						Front-end
					</span>

					<span className={cx('salary')}>10M</span>

					<span className={cx('location')}>Hanoi</span>
				</div>

				<div className={cx('employer')}>
					<img src={images.founder} alt="" />
					<span>Le Hoang Anh</span>
				</div>
			</div>

		</Fragment>
	);
}

export default RecruitmentItem;