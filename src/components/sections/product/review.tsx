import { UserImg } from "@/components/common/avatar";
import { StarIcon } from "lucide-react";
import React from "react";

export const Reviews = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Reviews</h2>
      <div className="mt-4 space-y-4">
        <div className="flex items-start gap-4">
          <UserImg fullName="John Doe" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">John Doe</span>
              <div className="flex items-center gap-1">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">
              This t-shirt is amazing! The fabric is so soft and comfortable,
              and the prism design is really unique and eye-catching. I've
              received so many compliments on it.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <UserImg fullName="Jane Smith" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Jane Smith</span>
              <div className="flex items-center gap-1">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">
              I'm so glad I found this t-shirt! The quality is excellent, and it
              fits me perfectly. I'll definitely be buying more from this brand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
