import classNames from 'classnames/bind';
import { Fragment, useContext } from 'react';
import images from '~/assets/images';
import styles from './Intro.module.scss';
import FooterComponent from '~/component/Layout/FooterComponent';
import LoginForm from '../Login&Register/LoginForm';
import RegisterForm from '../Login&Register/RegisterForm';
import { AuthContext } from '~/actions/context/AuthContext';
import { Navigate } from 'react-router-dom'
import { Toast } from 'react-bootstrap';

const cx = classNames.bind(styles)

function Intro() {

	const {
		authState: { isAuthenticated },
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuthContext)

	let body

	if (isAuthenticated) {
		return <Navigate to="/home" replace />
	} else {
		body = (
			<>
				<LoginForm />
			</>
		)
	}

	return (
		<Fragment>
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
			{body}
			<RegisterForm />
			<div className={cx('intro')}>
				<div className={cx('about-us')}>
					<div className={cx('about-content')}>
						<span className={cx('content-title')}>PROFESSIONALLY</span>
						<span className={cx('content-name')}>Little Pea</span>
						<span className={cx('content')}>
							A professional programming community is what Little Pea is trying to bring back to the Vietnamese programming community. Here, you can learn programming through free, quality courses from experts with many years of experience. Participating in Q&A, and sharing knowledge through the Programmer Blog system. In addition, we also cooperate and associate with tens of thousands of businesses to bring job opportunities to everyone, especially young people who love programming. All content is curated and refined by the dedicated staff of Little Pea.
						</span>
						<span className={cx('slogan')}>H??Y ????? LITTLE PEA CH???P C??NH ?????C M?? C???A B???N.</span>
					</div>

					<div className={cx('about-image')}>
						<img src={images.logo} alt="" className={cx('image')} />
						<div className={cx('circle-pink')}></div>
						<div className={cx('circle-violet')}></div>
						<div className={cx('circle-green')}></div>
					</div>
				</div>

				<div className={cx('desire')}>

					<div className={cx('desire-image')}>
						<img src={images.imageIntro} alt="" className={cx('image-desire')} />
						<div className={cx('desire-pink')}></div>
					</div>

					<div className={cx('desire-content')}>
						<span className={cx('desire-title')}>Little Pea</span>
						<span className={cx('desire-name')}>Give opportunities and grow</span>
						<span className={cx('content')}>
							Little Pea ti??n phong ????o t???o l???p tr??nh chuy??n s??u NodeJS v???i s??? m???nh ????o t???o l???p tr??nh vi??n chuy??n nghi???p to??n qu???c.
							H???c t???p trong m??i tr?????ng doanh nghi???p th???c t???, th???c h??nh li??n t???c c??ng chuy??n gia nhi???u n??m trong doanh nghi???p.
							Little Pea cam k???t 100% h???c vi??n t???t nghi???p c?? th??? l??m vi???c ngay t???i c??c doanh nghi???p l???n to??n qu???c.
						</span>
					</div>

				</div>

				<div className={cx('founder')}>

					<div className={cx('founder-image')}>
						<img src={images.founder} alt="" />
						<div className={cx('founder-violet-bold')}></div>
						<div className={cx('founder-violet')}></div>
					</div>

					<div className={cx('founder-description')}>
						<span className={cx('desire-title')}>Little Pea</span>
						<span className={cx('desire-name')}>Founder of Little Pea</span>
						<span className={cx('content')}>
							L?? Ho??ng Anh l?? m???t sinh vi??n khoa C??ng ngh??? th??ng tin c???a ?????i h???c Greenwich Vi???t Nam.
							V???i mong mu???n t???o ra m???t c???ng ?????ng h???c l???p tr??nh chuy??n nghi???p v?? kh??p k??n, Ho??ng Anh
							???? d??nh h???t t??m huy???t c???a m??nh ????? t???o ra Little Pea - m???t c???ng ?????ng h???c l???p tr??nh, h???i ????p
							d??nh cho nh???ng sinh vi??n IT. ?????ng th???i, Little Pea c?? th??? gi??p thu h???p kho???ng c??ch gi???a nh???ng l???p tr??nh
							vi??n v?? nh?? tuy???n d???ng c???a doanh nghi???p.
						</span>
						<div className={cx('founder-pink')}></div>
						<div className={cx('founder-green')}></div>
					</div>
				</div>

			</div>


			<FooterComponent />

		</Fragment>
	);
}

export default Intro;