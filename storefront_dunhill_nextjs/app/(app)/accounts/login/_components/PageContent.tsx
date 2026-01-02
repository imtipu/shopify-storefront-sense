'use client';


import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button, Input
} from "@heroui/react";

import { MotionCard, MotionCardBody, MotionCardFooter, MotionCardHeader } from "@/components/motion/card";


export default function PageContent() {
    return (
			<div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[calc(100vh-500px)]">
				<MotionCard
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md"
				>
					<MotionCardHeader
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						<div className="flex flex-col items-center gap-2 w-full py-5">
							<h2 className="text-xl font-bold">Login</h2>
							<p className="text-sm text-gray-500">Login to your account</p>
						</div>
					</MotionCardHeader>
					<MotionCardBody
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
					>
						<div className="flex flex-col gap-4 py-5 mx-auto max-w-sm w-full">
                        <Input
                            radius="none"
                            variant="bordered"
                            placeholder="Email"
                            className="text-center"
                        />
                        <Input
                            radius="none"
                            variant="bordered"
                            placeholder="Password"
                            className="text-center" />
						</div>
					</MotionCardBody>
					<MotionCardFooter
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
					>
						<div className="flex flex-col items-center gap-2 w-full">
                        <Button
                            radius="none"
                            variant="solid"
                            className="w-full max-w-sm bg-black text-white text-sm">Submit</Button>
                        <Button
                            variant="flat"
                            radius="none" className="w-full max-w-sm text-sm">Cancel</Button>
						</div>
					</MotionCardFooter>
				</MotionCard>
			</div>
		);
}

