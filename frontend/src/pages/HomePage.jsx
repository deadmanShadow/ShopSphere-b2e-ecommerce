import { motion } from "framer-motion";
import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];
const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);
	const headingVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeInOut" }
		}
	};
	const categoriesContainerVariants = {
		visible: {
			transition: {
				staggerChildren: 0.2
			}
		}
	};
	const categoryItemVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5, ease: "easeInOut" }
		}
	};
	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'
					initial="hidden"
					animate="visible"
					variants={headingVariants}
				>
					Explore Our Categories
				</motion.h1>
				<motion.p
					className='text-center text-xl text-gray-300 mb-12'
					initial="hidden"
					animate="visible"
					variants={headingVariants}
					transition={{ delay: 0.3 }}
				>
					Discover the latest trends in eco-friendly fashion
				</motion.p>
				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
					initial="hidden"
					animate="visible"
					variants={categoriesContainerVariants}
				>
					{categories.map((category) => (
						<motion.div key={category.name} variants={categoryItemVariants}>
							<CategoryItem category={category} />
						</motion.div>
					))}
				</motion.div>
				{!isLoading && products.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
					>
						<FeaturedProducts featuredProducts={products} />
					</motion.div>
				)}
			</div>
		</div>
	);
};
export default HomePage;