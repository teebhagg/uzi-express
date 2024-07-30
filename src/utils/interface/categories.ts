// import { CategoryWithIncludes } from "@/lib/prisma";


// //   export const categories: CategoryWithIncludes[] = [
// //     {
// //       id: 'electronics',
// //       title: 'Electronics',
// //       subCategories: [
// //         { id: 'mobile-phones', title: 'Mobile Phones' },
// //         { id: 'computers-laptops', title: 'Computers & Laptops' },
// //         { id: 'tablets', title: 'Tablets' },
// //         { id: 'cameras', title: 'Cameras' },
// //         { id: 'audio-headphones', title: 'Audio & Headphones' },
// //         { id: 'wearable-technology', title: 'Wearable Technology' },
// //         { id: 'accessories', title: 'Accessories' },
// //       ],
// //     },
// //     {
// //       id: 'fashion',
// //       title: 'Fashion',
// //       subCategories: [
// //         { id: 'mens-clothing', title: "Men's Clothing" },
// //         { id: 'womens-clothing', title: "Women's Clothing" },
// //         { id: 'kids-clothing', title: "Kids' Clothing" },
// //         { id: 'shoes', title: 'Shoes' },
// //         { id: 'accessories', title: 'Accessories (Bags, Jewelry, Watches, etc.)' },
// //       ],
// //     },
// //     {
// //       id: 'home-kitchen',
// //       title: 'Home & Kitchen',
// //       subCategories: [
// //         { id: 'furniture', title: 'Furniture' },
// //         { id: 'home-decor', title: 'Home Decor' },
// //         { id: 'kitchen-appliances', title: 'Kitchen Appliances' },
// //         { id: 'cookware-tableware', title: 'Cookware & Tableware' },
// //         { id: 'bedding-bath', title: 'Bedding & Bath' },
// //       ],
// //     },
// //     {
// //       id: 'beauty-personal-care',
// //       title: 'Beauty & Personal Care',
// //       subCategories: [
// //         { id: 'skincare', title: 'Skincare' },
// //         { id: 'haircare', title: 'Haircare' },
// //         { id: 'makeup', title: 'Makeup' },
// //         { id: 'fragrances', title: 'Fragrances' },
// //         { id: 'personal-care-appliances', title: 'Personal Care Appliances' },
// //       ],
// //     },
// //     {
// //       id: 'health-wellness',
// //       title: 'Health & Wellness',
// //       subCategories: [
// //         { id: 'vitamins-supplements', title: 'Vitamins & Supplements' },
// //         { id: 'medical-supplies', title: 'Medical Supplies' },
// //         { id: 'fitness-equipment', title: 'Fitness Equipment' },
// //         { id: 'health-monitors', title: 'Health Monitors' },
// //       ],
// //     },
// //     {
// //       id: 'sports-outdoors',
// //       title: 'Sports & Outdoors',
// //       subCategories: [
// //         { id: 'outdoor-gear', title: 'Outdoor Gear' },
// //         { id: 'exercise-fitness-equipment', title: 'Exercise & Fitness Equipment' },
// //         { id: 'sportswear', title: 'Sportswear' },
// //         { id: 'camping-hiking', title: 'Camping & Hiking' },
// //       ],
// //     },
// //     {
// //       id: 'toys-games',
// //       title: 'Toys & Games',
// //       subCategories: [
// //         { id: 'action-figures', title: 'Action Figures' },
// //         { id: 'dolls-accessories', title: 'Dolls & Accessories' },
// //         { id: 'board-games', title: 'Board Games' },
// //         { id: 'educational-toys', title: 'Educational Toys' },
// //         { id: 'puzzles', title: 'Puzzles' },
// //       ],
// //     },
// //     {
// //       id: 'books-media',
// //       title: 'Books & Media',
// //       subCategories: [
// //         { id: 'books', title: 'Books' },
// //         { id: 'ebooks', title: 'eBooks' },
// //         { id: 'movies-tv-shows', title: 'Movies & TV Shows' },
// //         { id: 'music', title: 'Music' },
// //         { id: 'video-games', title: 'Video Games' },
// //       ],
// //     },
// //     {
// //       id: 'groceries',
// //       title: 'Groceries',
// //       subCategories: [
// //         { id: 'fresh-produce', title: 'Fresh Produce' },
// //         { id: 'packaged-foods', title: 'Packaged Foods' },
// //         { id: 'beverages', title: 'Beverages' },
// //         { id: 'snacks', title: 'Snacks' },
// //         { id: 'household-supplies', title: 'Household Supplies' },
// //       ],
// //     },
// //     {
// //       id: 'automotive',
// //       title: 'Automotive',
// //       subCategories: [
// //         { id: 'car-accessories', title: 'Car Accessories' },
// //         { id: 'motorcycle-accessories', title: 'Motorcycle Accessories' },
// //         { id: 'tools-equipment', title: 'Tools & Equipment' },
// //         { id: 'oils-fluids', title: 'Oils & Fluids' },
// //       ],
// //     },
// //     {
// //       id: 'office-supplies',
// //       title: 'Office Supplies',
// //       subCategories: [
// //         { id: 'stationery', title: 'Stationery' },
// //         { id: 'office-furniture', title: 'Office Furniture' },
// //         { id: 'electronics-for-office', title: 'Electronics for Office' },
// //         { id: 'printer-supplies', title: 'Printer Supplies' },
// //       ],
// //     },
// //     {
// //       id: 'baby-products',
// //       title: 'Baby Products',
// //       subCategories: [
// //         { id: 'baby-clothing', title: 'Baby Clothing' },
// //         { id: 'diapers-wipes', title: 'Diapers & Wipes' },
// //         { id: 'baby-food', title: 'Baby Food' },
// //         { id: 'toys-for-babies', title: 'Toys for Babies' },
// //       ],
// //     },
// //     {
// //       id: 'pet-supplies',
// //       title: 'Pet Supplies',
// //       subCategories: [
// //         { id: 'food-treats', title: 'Food & Treats' },
// //         { id: 'pet-toys', title: 'Pet Toys' },
// //         { id: 'pet-grooming', title: 'Pet Grooming' },
// //         { id: 'pet-beds-furniture', title: 'Pet Beds & Furniture' },
// //       ],
// //     },
// //   ];
  

// const categories: CategoryWithIncludes[] = [
//     {
//       id: '1',
//       title: 'Electronics',
//       description: 'Devices and gadgets',
//       products: [],
//       banners: [],
//       subCategories: [
//         {
//           id: '1-1',
//           title: 'Mobile Phones',
//           description: 'Smartphones and accessories',
//           categoryId: '1',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '1-2',
//           title: 'Laptops',
//           description: 'Laptops and accessories',
//           categoryId: '1',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '1-3',
//           title: 'Cameras',
//           description: 'Digital cameras and accessories',
//           categoryId: '1',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       id: '2',
//       title: 'Fashion',
//       description: 'Clothing and accessories',
//       products: [],
//       banners: [],
//       subCategories: [
//         {
//           id: '2-1',
//           title: 'Men',
//           description: 'Men clothing and accessories',
//           categoryId: '2',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '2-2',
//           title: 'Women',
//           description: 'Women clothing and accessories',
//           categoryId: '2',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '2-3',
//           title: 'Kids',
//           description: 'Kids clothing and accessories',
//           categoryId: '2',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       id: '3',
//       title: 'Home & Kitchen',
//       description: 'Appliances and utensils',
//       products: [],
//       banners: [],
//       subCategories: [
//         {
//           id: '3-1',
//           title: 'Furniture',
//           description: 'Home furniture',
//           categoryId: '3',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '3-2',
//           title: 'Kitchen Appliances',
//           description: 'Appliances for kitchen',
//           categoryId: '3',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '3-3',
//           title: 'Decor',
//           description: 'Home decor items',
//           categoryId: '3',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       id: '4',
//       title: 'Beauty & Personal Care',
//       description: 'Cosmetics and skincare',
//       products: [],
//       banners: [],
//       subCategories: [
//         {
//           id: '4-1',
//           title: 'Skincare',
//           description: 'Skincare products',
//           categoryId: '4',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '4-2',
//           title: 'Makeup',
//           description: 'Makeup products',
//           categoryId: '4',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '4-3',
//           title: 'Hair Care',
//           description: 'Hair care products',
//           categoryId: '4',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       id: '5',
//       title: 'Sports & Outdoors',
//       description: 'Sporting goods and outdoor gear',
//       products: [],
//       banners: [],
//       subCategories: [
//         {
//           id: '5-1',
//           title: 'Fitness Equipment',
//           description: 'Home fitness equipment',
//           categoryId: '5',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '5-2',
//           title: 'Outdoor Gear',
//           description: 'Gear for outdoor activities',
//           categoryId: '5',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           id: '5-3',
//           title: 'Sportswear',
//           description: 'Clothing for sports',
//           categoryId: '5',
//           products: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//   ];
  