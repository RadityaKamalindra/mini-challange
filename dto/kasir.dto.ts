export class ItemDto {
  nama: string;
  harga: number;
  qty: number;
}

export class CheckoutDto {
  items: ItemDto[];
}
