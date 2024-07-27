import { ProductWithIncludes } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { categories } from "./categories";
import { brands } from "./brands";

// Get a random number between 1 (inclusive) and 5 (inclusive) using the Math.floor() method

// const randomRating = Math.floor(Math.random() * 5) + 1;

// export const productData: ProductWithIncludes[] = [
//   {
//     id: faker.string.uuid(),
//     title: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     price: Number(faker.commerce.price()),
//     discount: Number(faker.commerce.price({ max: 70 })),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//     images: [faker.image.url(), faker.image.url()],
//     keywords: [faker.commerce.productName(), faker.commerce.productName()],
//     categories: [
//         categories[0]
//     ],
//     brand: {
//       id: faker.string.uuid(),
//       title: faker.commerce.productName(),
//       description: faker.commerce.productDescription(),
//       logo: faker.image.url(),
//     },
//     isAvailable: faker.datatype.boolean(),
//     isFeatured: faker.datatype.boolean(),
//     isPhysical: faker.datatype.boolean(),
//     metadata: {
//       title: faker.commerce.productName(),
//       description: faker.commerce.productDescription(),
//       keywords: [faker.commerce.productName(), faker.commerce.productName()],
//     },
//     stock: faker.number.int(),
//     brandId: faker.string.uuid(),
//     subCategory: [
//       {
//         id: faker.string.uuid(),
//         title: faker.commerce.productName(),
//         slug: faker.string.uuid(),
//         description: faker.commerce.productDescription(),
//         categoryId: faker.string.uuid(),
//         createdAt: faker.date.past(),
//         updatedAt: faker.date.recent(),
//       },
//     ],
//   },
// ];

export const productData: ProductWithIncludes[] = Array.from({
  length: 10,
}).map(() => {
  const categoryIndex = Math.floor(Math.random() * 5);
  return {
    //   ...faker.helpers.arrayElement(productData),
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    discount: Number(faker.commerce.price({ max: 70 })),
    rating: Math.floor(Math.random() * 5) + 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    images: [faker.image.url(), faker.image.url()],
    keywords: [faker.commerce.productName(), faker.commerce.productName()],
    categories: [categories[categoryIndex]],
    brand: faker.helpers.arrayElement(brands),
    isAvailable: faker.datatype.boolean(),
    isFeatured: faker.datatype.boolean(),
    isPhysical: faker.datatype.boolean(),
    metadata: {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      keywords: [faker.commerce.productName(), faker.commerce.productName()],
    },
    stock: faker.number.int(),
    brandId: faker.string.uuid(),
    subCategory: [
      categories[categoryIndex].subCategories[0]
    ],
  };
});
