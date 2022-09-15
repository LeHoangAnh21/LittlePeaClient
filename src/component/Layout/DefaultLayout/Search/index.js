import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import SearchIcon from '@material-ui/icons/Search';

const cx = classNames.bind(styles)

function Search() {
	return (  
		<div className={cx('search')}>
			<div className={cx('search-component')}>
				<SearchIcon />
				<input
					className={cx('input')}
					placeholder='Search....'
				/>
			</div>
		</div>

	);
}

export default Search;