/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { Link, useNavigate } from 'react-router-dom';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Tabs({ tabs }) {
	const navigate = useNavigate();
	const handleOnChange = (e) => {
		navigate(e.target.value.toLowerCase());
	};

	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					id="tabs"
					name="tabs"
					className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					onChange={(e) => handleOnChange(e)}
					defaultValue={tabs.find((tab) => tab.current)?.href}
				>
					{tabs.map((tab) => (
						<option key={tab.href}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<nav className="flex space-x-4" aria-label="Tabs">
					{tabs.map((tab) =>
						tab.href ? (
							<Link
								key={tab.name}
								to={tab.href}
								className={classNames(
									tab.current ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:text-gray-800',
									'px-3 py-2 font-medium text-sm rounded-md',
									tab.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								{tab.name}
							</Link>
						) : (
							<div
								key={tab.name}
								className={classNames(
									tab.current ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:text-gray-800',
									'cursor-pointer px-3 py-2 font-medium text-sm rounded-md',
									tab.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								{tab.name}
							</div>
						)
					)}
				</nav>
			</div>
		</div>
	);
}
