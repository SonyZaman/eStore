// create-product.dto.ts
export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  productType: string;
  vendorId: number;       // ID of the vendor
  categoryId: number;     // ID of the category
  imageUrl?: string;      // Optional image URL for the product
}
