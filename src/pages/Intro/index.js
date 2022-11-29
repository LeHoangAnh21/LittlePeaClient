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
						<span className={cx('slogan')}>HÃY ĐỂ LITTLE PEA CHẮP CÁNH ƯỚC MƠ CỦA BẠN.</span>
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
							Little Pea tiên phong đào tạo lập trình chuyên sâu NodeJS với sứ mệnh đào tạo lập trình viên chuyên nghiệp toàn quốc.
							Học tập trong môi trường doanh nghiệp thực tế, thực hành liên tục cùng chuyên gia nhiều năm trong doanh nghiệp.
							Little Pea cam kết 100% học viên tốt nghiệp có thể làm việc ngay tại các doanh nghiệp lớn toàn quốc.
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
							Lê Hoàng Anh là một sinh viên khoa Công nghệ thông tin của đại học Greenwich Việt Nam.
							Với mong muốn tạo ra một cộng đồng học lập trình chuyên nghiệp và khép kín, Hoàng Anh
							đã dành hết tâm huyết của mình để tạo ra Little Pea - một cộng đồng học lập trình, hỏi đáp
							dành cho những sinh viên IT. Đồng thời, Little Pea có thể giúp thu hẹp khoảng cách giữa những lập trình
							viên và nhà tuyển dụng của doanh nghiệp.
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