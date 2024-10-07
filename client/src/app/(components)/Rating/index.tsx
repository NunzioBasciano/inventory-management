import { Star } from "lucide-react";

interface IRating {
  rating: number;
}

const Rating = ({ rating }: IRating) => {
  return [1, 2, 3, 4, 5].map((index) => {
    return (
      <Star
        key={index}
        color={index <= rating ? "#FFC107" : "#E4E5E9"}
        className="w-4 h-4"
      />
    );
  });
};

export default Rating;
