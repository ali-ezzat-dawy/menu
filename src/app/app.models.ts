export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public phone: string
  ) {}
}

export class Employee {
  constructor(
    public id: number,
    public image: string,
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public email: string,
    public phone: string,
    public addresses: Address[],
    public position: Position
  ) {}
}

//['General Manager','Assistant Manager'] ... https://aptito.com/blog/restaurant-positions-and-descriptions
export class Position {
  constructor(public id: number, public name: string) {}
}

export class Address {
  constructor(
    public id: number,
    public country: Country,
    public city: string,
    public place: string,
    public postalCode: string,
    public addressLine: string
  ) {}
}

export class Country {
  constructor(public name: string, public code: string) {}
}

export class Customer {
  constructor(
    public id: number,
    public fullName: string,
    public email: string,
    public phoneNumber: string,
    public address: string
  ) {}
}

export class Reservation {
  constructor(
    public id: number,
    public date: string,
    public time: string,
    public customer: Customer,
    public guests: number,
    public tableNumber: number,
    // public status: ReservationStatus
  ) {}
}

// Approved, Cancelled, Pending
// export class ReservationStatus {
//   constructor(public id: number, public name: string) {}
// }

export class Order {
  constructor(
    public id: number,
    public date: string,
    public items: MenuItem[],
    public quantity: number,
    public amount: number,
    public status: OrderStatus
  ) {}
}

//Completed, Processing, On Hold, Refunded, Pending
export class OrderStatus {
  constructor(public id: number, public name: string) {}
}

export class MenuItem {
  static image: string;
  constructor(
    public id: number,
    public categoryId: number,
    public product_name: string,
    public cartCount: number,
    public name: string,
    public product_description: string,
    public description:string,
    public product_price: number,
    public price: number,
    public user_personal_image: MenuItemImage ,
    public  image: MenuItemImage,
    public category_name:any,
    public availibilityCount: number,

  ) {}
}

export class MenuItemImage {
  constructor(
    public small: string,
    public medium: string,
    public big: string
  ) {}
}

export class Category {
  constructor(
    public allCategories: ArrayBuffer,
    public id: number,
    public category_name: string,
    public category_order: string
  ) {}
}

export class Pagination {
  constructor(
    public page: number,
    public perPage: number,
    public prePage: number | null,
    public nextPage: number | null,
    public total: number,
    public totalPages: number
  ) {}
}
