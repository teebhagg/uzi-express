import { de, faker } from "@faker-js/faker";
import { BrandWithIncludes } from "@/lib/prisma";


const brandData = [
  {
    id: "1",
    title: "Apple",
    description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.",
    slug: "apple",
  },
  {
    id: "2",
    title: "Samsung",
    description: "Samsung Electronics Co., Ltd. is a South Korean multinational conglomerate headquartered in Samsung Town, Seoul, South Korea. The company is owned by Samsung South Korea.",
    slug: "samsung",
  },
  {
    id: "3",
    title: "Google",
    description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
    slug: "google",
  },
  {
    id: "4",
    title: "Nike",
    description: "Nikkei Inc. is a Japanese multinational conglomerate headquartered in Singapore. The company specializes in consumer footwear, apparel, accessories, and services.",
    slug: "nike",
  },
  {
    id: "5",
    title: "Adidas",
    description: "Adidas AG is a German multinational corporation that designs and manufactures shoes, clothing, and accessories.",
    slug: "adidas",
  },
  {
    id: "6",
    title: "Reebok",
    description: "Reebok International Ltd. is a multinational corporation that produces and distributes footwear, apparel, accessories, and services.",
    slug: "reebok",
  },
  {
    id: "7",
    title: "Canon",
    description: "Canon Inc. is a Japanese multinational conglomerate headquartered in Canon Town, Kanto, Japan. The company is owned by Canon, Ltd.",
    slug: "canon",
  },
  {
    id: "8",
    title: "Nikon",
    description: "Nikon Corporation is a Japanese multinational conglomerate headquartered in Kanagawa. The company is owned by Canon, Ltd.",
    slug: "nikon",
  },
];

export const brands: BrandWithIncludes[] = brandData.map((brand) => ({
  ...brand,
  logo: faker.image.url(),
  products: [],
}));
