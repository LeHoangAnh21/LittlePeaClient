import Carousel from 'react-bootstrap/Carousel';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Slider() {
	return (
		<div className={cx('slider-item')}>
			<Carousel>
				<Carousel.Item interval={2000}>
					<img
						className="d-block w-100"
						src={images.technology}
						alt="First slide"
						style={{ height: '400px', borderRadius: '30px' }}
					/>
				</Carousel.Item>
				<Carousel.Item interval={2000}>
					<img
						className="d-block w-100"
						src={images.introblog}
						alt="Second slide"
						style={{ height: '400px', borderRadius: '30px' }}
					/>
				</Carousel.Item>
				<Carousel.Item interval={2000}>
					<img
						className="d-block w-100"
						src={images.recruitment}
						alt="Third slide"
						style={{ height: '400px', borderRadius: '30px' }}
					/>
				</Carousel.Item>
			</Carousel>
		</div>
	);
}

export default Slider;
