'use client';

import { useState } from "react";
import { Button } from "@heroui/react";
import { VariantOptions } from "@/constants/products";

export default function VariantPicker() {
	// Initialize selected variants with the first value of each option
	const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(
		VariantOptions.reduce((acc, option) => {
			acc[option.title] = option.values[0].value;
			return acc;
		}, {} as Record<string, string>)
	);

	const handleSelect = (optionTitle: string, value: string) => {
		setSelectedVariants((prev) => ({
			...prev,
			[optionTitle]: value,
		}));
	};

	return (
		<div className="flex flex-col w-full gap-6 mt-4">
			{VariantOptions.map((option) => (
				<div key={option.title} className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<label className="text-xs font-medium tracking-widest uppercase text-neutral-500">
							{option.title}: <span className="text-black ml-1">{selectedVariants[option.title]}</span>
						</label>
					</div>
					<div className="flex flex-wrap gap-2">
						{option.values.map((value) => {
							const isSelected = selectedVariants[option.title] === value.value;
							return (
								<Button
									key={value.value}
									onPress={() => handleSelect(option.title, value.value)}
									variant={isSelected ? "solid" : "bordered"}
									size="sm"
									radius="none"
									disableAnimation
									className={`
										min-w-[60px] h-10 px-4 
										border-neutral-200 
										${isSelected ? 'bg-black text-white border-black' : 'bg-transparent text-black hover:border-black group transition-all duration-300'}
										text-xs font-medium tracking-widest uppercase
									`}
								>
									{value.name}
								</Button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
}

