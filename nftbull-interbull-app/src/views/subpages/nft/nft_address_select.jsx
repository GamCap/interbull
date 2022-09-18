/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import { useAccount } from 'wagmi';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const publishingOptions = [
	{
		title: 'All Assets',
		address: null,
	},
];

export default function NFTAddressSelect({ selected, setSelected }) {
	const { address } = useAccount();

	useEffect(() => {
		setSelected(
			address
				? { title: 'Your Assets', address }
				: {
						title: 'All Assets',
						address: null,
				  }
		);
	}, [address]);
	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<>
					<Listbox.Label className="sr-only">Change published status</Listbox.Label>
					<div className="relative">
						<div className="inline-flex rounded-md">
							<div className="relative z-0 inline-flex rounded-md">
								<div className="relative inline-flex items-center py-2 pl-3 pr-4 border border-gray-200 rounded-l-md">
									<p className="ml-2.5 text-sm font-medium">{selected.title}</p>
								</div>
								<Listbox.Button className="relative inline-flex items-center p-2 border border-gray-200 border-l-0 rounded-l-none rounded-r-md text-sm font-medium hover:bg-gray-100 focus:outline-none focus:z-10">
									<span className="sr-only">Change published status</span>
									<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
								</Listbox.Button>
							</div>
						</div>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
								{address && (
									<Listbox.Option
										key={'Your Assets'}
										className={({ active }) =>
											classNames(
												active ? 'bg-gray-100' : 'text-gray-900',
												'cursor-default select-none relative p-4 text-sm'
											)
										}
										value={{
											title: 'Your Assets',
											address,
										}}
									>
										{({ select, active }) => (
											<div className="flex flex-col">
												<div className="inline-flex space-x-2">
													<p className={select ? 'font-semibold' : 'font-normal'}>{'Your Assets'}</p>
												</div>
											</div>
										)}
									</Listbox.Option>
								)}
								{publishingOptions.map((option) => (
									<Listbox.Option
										disabled={option.comingSoon}
										key={option.title}
										className={({ active }) =>
											classNames(
												active ? 'bg-gray-100' : 'text-gray-900',
												option.comingSoon ? 'bg-gray-50 text-gray-700' : '',

												'cursor-default select-none relative p-4 text-sm'
											)
										}
										value={option}
									>
										{({ select, active }) => (
											<div className="flex flex-col">
												<div className="inline-flex space-x-2">
													<p className={select ? 'font-semibold' : 'font-normal'}>{option.title}</p>
												</div>
											</div>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
