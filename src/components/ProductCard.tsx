
import React from "react";
import { Product } from "../types/quiz";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

interface ProductCardProps {
  product: Product;
  isRecommended?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isRecommended = false }) => {
  return (
    <Card className={`overflow-hidden transition-all ${isRecommended ? "border-primary border-2" : ""}`}>
      <div className="relative">
        {isRecommended && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            Recomendado
          </div>
        )}
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="text-sm">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full">Ver Produto</Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
