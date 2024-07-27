// export const categories = [
//   {
//     id: "1",
//     title: "Electronics",
//     slug: "electronics",
//   },
//   {
//     id: "2",
//     title: "Clothing",
//     slug: "clothing",
//   },
//   {
//     id: "3",
//     title: "Shoes",
//     slug: "shoes",
//   },
//   {
//     id: "4",
//     title: "Accessories",
//     slug: "accessories",
//   },
//   {
//     id: "5",
//     title: "Home",
//     slug: "home",
//   },
//   {
//     id: "6",
//     title: "Beauty",
//     slug: "beauty",
//   },
//   {
//     id: "7",
//     title: "Toys",
//     slug: "toys",
//   },
//   {
//     id: "8",
//     title: "Books",
//     slug: "books",
//   },
//   {
//     id: "9",
//     title: "Sports",
//     slug: "sports",
//   },
//   {
//     id: "10",
//     title: "Food",
//     slug: "food",
//   },
//   {
//     id: "11",
//     title: "Furniture",
//     slug: "furniture",
//   },
//   {
//     id: "12",
//     title: "Jewelry",
//     slug: "jewelry",
//   },
//   {
//     id: "13",
//     title: "Garden",
//     slug: "garden",
//   },
//   {
//     id: "14",
//     title: "Tools",
//     slug: "tools",
//   },
//   {
//     id: "15",
//     title: "Pet",
//     slug: "pet",
//   },
//   {
//     id: "16",
//     title: "Automotive",
//     slug: "automotive",
//   },
//   {
//     id: "17",
//     title: "Health",
//     slug: "health",
//   },
//   {
//     id: "18",
//     title: "Music",
//     slug: "music",
//   },
//   {
//     id: "19",
//     title: "Movies",
//     slug: "movies",
//   },
//   {
//     id: "20",
//     title: "Games",
//     slug: "games",
//   },
//   {
//     id: "21",
//     title: "Art",
//     slug: "art",
//   },
//   {
//     id: "22",
//     title: "Collectibles",
//     slug: "collectibles",
//   },
//   {
//     id: "23",
//     title: "Crafts",
//     slug: "crafts",
//   },
// ];

import { CategoryWithIncludes } from "@/lib/prisma";


export const categories: CategoryWithIncludes[] = [
    {
      id: '1',
      title: 'Electronics',
      slug: 'electronics',
      description: 'Devices and gadgets',
      products: [],
      banners: [],
      subCategories: [
        {
          id: '1-1',
          title: 'Mobile Phones',
          slug: 'mobile-phones',
          description: 'Smartphones and accessories',
          categoryId: '1',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '1-2',
          title: 'Laptops',
          slug: 'laptops',
          description: 'Laptops and accessories',
          categoryId: '1',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '1-3',
          title: 'Cameras',
          slug: 'cameras',
          description: 'Digital cameras and accessories',
          categoryId: '1',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Fashion',
      slug: 'fashion',
      description: 'Clothing and accessories',
      products: [],
      banners: [],
      subCategories: [
        {
          id: '2-1',
          title: 'Men',
          slug: 'men',
          description: 'Men clothing and accessories',
          categoryId: '2',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2-2',
          title: 'Women',
          slug: 'women',
          description: 'Women clothing and accessories',
          categoryId: '2',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2-3',
          title: 'Kids',
          slug: 'kids',
          description: 'Kids clothing and accessories',
          categoryId: '2',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Home & Kitchen',
      slug: 'home-kitchen',
      description: 'Appliances and utensils',
      products: [],
      banners: [],
      subCategories: [
        {
          id: '3-1',
          title: 'Furniture',
          slug: 'furniture',
          description: 'Home furniture',
          categoryId: '3',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3-2',
          title: 'Kitchen Appliances',
          slug: 'kitchen-appliances',
          description: 'Appliances for kitchen',
          categoryId: '3',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3-3',
          title: 'Decor',
          slug: 'decor',
          description: 'Home decor items',
          categoryId: '3',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'Beauty & Personal Care',
      slug: 'beauty-personal-care',
      description: 'Cosmetics and skincare',
      products: [],
      banners: [],
      subCategories: [
        {
          id: '4-1',
          title: 'Skincare',
          slug: 'skincare',
          description: 'Skincare products',
          categoryId: '4',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4-2',
          title: 'Makeup',
          slug: 'makeup',
          description: 'Makeup products',
          categoryId: '4',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4-3',
          title: 'Hair Care',
          slug: 'hair-care',
          description: 'Hair care products',
          categoryId: '4',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      title: 'Sports & Outdoors',
      slug: 'sports-outdoors',
      description: 'Sporting goods and outdoor gear',
      products: [],
      banners: [],
      subCategories: [
        {
          id: '5-1',
          title: 'Fitness Equipment',
          slug: 'fitness-equipment',
          description: 'Home fitness equipment',
          categoryId: '5',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '5-2',
          title: 'Outdoor Gear',
          slug: 'outdoor-gear',
          description: 'Gear for outdoor activities',
          categoryId: '5',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '5-3',
          title: 'Sportswear',
          slug: 'sportswear',
          description: 'Clothing for sports',
          categoryId: '5',
          products: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  