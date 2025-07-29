// components/DropdownMenu.jsx
import { useEffect, useRef } from 'react';

function DropdownMenu() {
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    const menu = dropdownRef.current.querySelector('.Main-Course-T-sticky-nav-dropdown-menu');
    const toggle = dropdownRef.current.querySelector('.Main-Course-T-sticky-nav-dropdown-toggle');
    toggle.classList.toggle('open');
    menu.classList.toggle('show');
  };

  const selectItem = (text) => {
    const label = dropdownRef.current.querySelector('.Main-Course-T-sticky-nav-dropdown-label');
    label.textContent = text;
    dropdownRef.current.querySelector('.show')?.classList.remove('show');
    dropdownRef.current.querySelector('.open')?.classList.remove('open');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dropdownRef.current.querySelector('.show')?.classList.remove('show');
        dropdownRef.current.querySelector('.open')?.classList.remove('open');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="Main-Course-T-sticky-nav-dropdown" ref={dropdownRef}>
      <div className="Main-Course-T-sticky-nav-dropdown-toggle" onClick={toggleDropdown}>
        Toggle
      </div>
      <div className="Main-Course-T-sticky-nav-dropdown-menu">
        {['Item 1', 'Item 2', 'Item 3'].map((item) => (
          <div key={item} onClick={() => selectItem(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownMenu;
