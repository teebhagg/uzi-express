import { Prisma } from "@prisma/client";
import exp from "constants";

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        brand: true;
        categories: true;
      };
    };
  };
}>;

export type ProductWithIncludes = Prisma.ProductGetPayload<{
  include: {
     subCategory: true;
     brand: true;
     categories: true;
  };
}>;

export type UserWithIncludes = Prisma.UserGetPayload<{
  include: {
    addresses: true;
    orders: {
      include: {
        orderItems: {
          include: {
            product: true;
          };
        };
      };
    };
  };
}>;

export type OrderWithIncludes = Prisma.OrderGetPayload<{
  include: {
    address: true;
    discountCode: true;
    user: {
      include: {
        addresses: true;
        payments: true;
        orders: true;
      };
    };
    payments: {
      include: {
        provider: true;
      };
    };
    orderItems: {
      include: {
        product: {
          include: {
            brand: true;
            categories: true;
          };
        };
      };
    };
    refund: true;
  };
}>;

export type CartWithIncludes = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            brand: true;
            categories: true;
          };
        };
      };
    };
  };
}>;

export type AuthorWithIncludes = Prisma.AuthorGetPayload<{
   include: {
      blogs: true;
   }
}>;

export type BrandWithIncludes = Prisma.BrandGetPayload<{
   include: {
      products: false;
   }
}>;

export type CategoryWithIncludes = Prisma.CategoryGetPayload<{
   include: {
      subCategories: {
         include: {
            products: true;
            category: false
         };
      };
      products: true;
      banners: true;
   }
}>;

export type SubCategoryWithIncludes = Prisma.SubCategoryGetPayload<{
   include: {
      products: true;
   }
}>;

export type ProductReviewWithIncludes = Prisma.ProductReviewGetPayload<{
   include: {
      user: true;
      product: true;
   }
}>;

export type OrderItemWithIncludes = Prisma.OrderItemGetPayload<{
   include: {
      product: true;
   }
}>;

export type AddressWithIncludes = Prisma.AddressGetPayload<{
   include: {
      user: true;
      orders: true;
   }
}>;

export type NotificationWithIncludes = Prisma.NotificationGetPayload<{
   include: {
      user: true;
   }
}>;

export type DiscountCodeWithIncludes = Prisma.DiscountCodeGetPayload<{
   include: {
      order: true;
   }
}>;

export type RefundWithIncludes = Prisma.RefundGetPayload<{
   include: {
      order: true;
   }
}>;

export type PaymentWithIncludes = Prisma.PaymentGetPayload<{
   include: {
      order: true;
      user: true;
      provider: true;
   }
}>;

export type PaymentProviderWithIncludes = Prisma.PaymentProviderGetPayload<{
   include: {
      orders: false;
   }
}>;

export type ErrorWithIncludes = Prisma.ErrorGetPayload<{
   include: {
      user: true;
   }
}>;

export type FileWithIncludes = Prisma.FileGetPayload<{
   include: {
      user: true;
   }
}>;

export type BlogWithIncludes = Prisma.BlogGetPayload<{
   include: {
      author: true;
   }
}>;

export type BannerWithIncludes = Prisma.BannerGetPayload<{
   include: {
      categories: false;
   }
}>;