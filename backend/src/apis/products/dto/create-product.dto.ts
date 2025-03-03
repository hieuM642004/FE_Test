export class CreateProductDto {
  readonly name: string;
  readonly images: string[];
  readonly description: string;
  readonly price: number;
  readonly views?: number;
  readonly idTopic: string;
  readonly slug?: string;
}
