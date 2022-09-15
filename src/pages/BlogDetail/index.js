import { BlogContext } from '~/actions/context/BlogContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss'
import { useParams } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function BlogDetail() {

	const { id } = useParams();

	const blogId = id;

	const {
		blogState: { blogs, },
		getBlog,
	} = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])


	let body = null

	if (blogs !== null) {
		body = (
			<Fragment>
				{blogs.map((blog) => {
					if (blogId === blog._id) {
						return (
							<div className={cx('intro')}>
								<div key={blog._id} className={cx('blog_content')}>
									<div className={cx('title_blog')}>
										<span>{blog.title}</span>
									</div>

									{blog.image !== '' && <CardMedia image={blog.image || 'null'} title='Title' className={cx('media')} />}
	
									<div className={cx('content_blog')}>
										<span>{blog.content || 'None'}</span>
									</div>
								</div>

								<div className={cx('manage')}>
									{/* <ManageBlog key={blog._id} data={blog} /> */}
								</div>
							</div>
						)
					}
				})}
			</Fragment>
		)
	}

	const [tym, setTym] = useState(false);
	const [numberTym, setNumberTym] = useState(0);

	console.log(tym);

	const handleReact = () => {
		setTym(!tym)

		if(tym === true) {
			setNumberTym(numberTym - 1)
		}else{
			setNumberTym(numberTym + 1)
		}
	}

	return (
		<div className={cx('blog_detail')}>

			<div className={cx('info')}>
				<div className={cx('blogger')}>
					<img src={images.founder} alt="" />
					<span>Le Hoang Anh</span>
				</div>
	
				<div className={cx('react')}>
					<div className={cx('react_tym')}>
						<FavoriteIcon onClick={handleReact} className={cx({tym: tym})} />
						<span>{numberTym}</span>
					</div>
	
					<div className={cx('react_comment')}>
						<ChatBubbleIcon />
					</div>
				</div>
			</div>

			{body}

		</div>
	);
}

export default BlogDetail;