import React from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitcher from '../theme-switcher';

// Icons
import { TbPhotoHexagon } from 'react-icons/tb';

const Navbar = () => {
	const { theme } = useTheme();
	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<TbPhotoHexagon className='text-4xl text-blue-500' />
					<div className='hidden text-2xl font-bold sm:flex'>NFT Rarity</div>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
