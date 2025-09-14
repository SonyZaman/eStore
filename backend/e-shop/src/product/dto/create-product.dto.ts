export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  productType: string;
  vendorId: number;       // ID of the vendor
  categoryId: number;     // ID of the category
}
