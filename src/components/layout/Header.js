import { Link, NavLink } from 'react-router-dom';
import { classNames } from '../../utils/helperFunctions';

const navigationLinks = [
  { name: 'Users', href: '/' },
  { name: 'Roles', href: '/roles' },
];

const Header = () => {
  return (
    <header className='bg-gray-700 h-20 px-12 flex justify-between items-center gap-12 sticky top-0 z-10'>
      <Link to='.'>
        <h1 className='text-3xl text-white'>RBAC UI</h1>
      </Link>

      <nav className='flex-1 space-x-5 relative top-1'>
        {navigationLinks.map(link => (
          <NavLink
            className={({ isActive }) =>
              classNames('px-3 py-2 rounded-md text-white', isActive ? 'active' : '')
            }
            key={link.name}
            to={link.href}
            end={true}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
