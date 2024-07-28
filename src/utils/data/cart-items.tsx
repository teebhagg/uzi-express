import { CartItemWithProduct } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { productData } from "./products";

// export const cartItemData: CartItemWithProduct[] = [
//     {
//         cartId: faker.string.uuid(),
//         count: faker.datatype.number({ min: 1, max: 10 }),
//         productId: faker.string.uuid(),
//         product: {
//             id: faker.string.uuid(),
//             title: faker.commerce.productName(),
//             description: faker.commerce.productDescription(),
//             price: Number(faker.commerce.price()),
//             discount: Number(faker.commerce.price({ max: 70 })),
//             createdAt: faker.date.past(),
//             updatedAt: faker.date.recent(),
//             images: [faker.image.url(), faker.image.url()],
//             rating: Math.floor(Math.random() * 5) + 1,
//             keywords: [faker.commerce.productName(), faker.commerce.productName()],
//             categories: [
//                 {
//                     id: faker.string.uuid(),
//                     title: faker.commerce.productName(),
//                     slug: faker.string.uuid(),
//                     description: faker.commerce.productDescription(),
//                     createdAt: faker.date.past(),
//                     updatedAt: faker.date.recent(),
//                 },
//             ],
//             brand: {
//                 id: faker.string.uuid(),
//                 title: faker.commerce.productName(),
//                 slug: faker.string.uuid(),
//                 description: faker.commerce.productDescription(),
//                 logo: faker.image.url(),
//             },
//             isAvailable: faker.datatype.boolean(),
//             isFeatured: faker.datatype.boolean(),
//             isPhysical: faker.datatype.boolean(),
//             metadata: {
//                 title: faker.commerce.productName(),
//                 description: faker.commerce.productDescription(),
//                 keywords: [faker.commerce.productName(), faker.commerce.productName()],
//             },
//             stock: faker.number.int(),
//             brandId: faker.string.uuid(),
//             // subCategory: [
//             //     {
//             //         id: faker.string.uuid(),
//             //         title: faker.commerce.productName(),
//             //         slug: faker.string.uuid(),
//             //         description: faker.commerce.productDescription(),
//             //         createdAt: faker.date.past(),
//             //         updatedAt: faker.date.recent(),
//             //     },
//             // ],
//         },
//     },
// ];



export const cartItemData: CartItemWithProduct[] = Array.from({
    length: 10,
}).map(() => {
    return {
        id: faker.string.uuid(),
        cartId: faker.string.uuid(),
        count: faker.number.int({ min: 1, max: 10 }),
        productId: faker.string.uuid(),
        product: faker.helpers.arrayElement(productData),
    };
});
