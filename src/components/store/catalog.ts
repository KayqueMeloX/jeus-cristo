/** Digital titles shown in the public storefront. `plan` is the /checkout plan key. */
export interface StoreBook {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly plan: string;
  readonly cover: string;
}

export const STORE_BOOKS: readonly StoreBook[] = [
  { id: "p20", title: "Seed of Faith — 20 Sacred Prayers", description: "A short devotional collection of 20 prayers for peace, family and daily gratitude.", price: 27, plan: "27", cover: "/media/seed-of-faith-27.jpg" },
  { id: "p40", title: "Seed of Faith — 40 Sacred Prayers", description: "Forty guided prayers with scripture references for a steady morning and evening routine.", price: 47, plan: "47", cover: "/media/seed-of-faith47.jpg" },
  { id: "p60", title: "Seed of Faith — 60 Sacred Prayers", description: "Sixty themed prayers and reflections organised by week for deeper devotional study.", price: 77, plan: "77", cover: "/images/faith-cover-sanctuary.jpg" },
  { id: "plan90", title: "90-Day Faith Activation Plan", description: "A 90-day reading and prayer journal with daily Bible passages and reflection prompts.", price: 97, plan: "activation", cover: "/images/faith-cover-plan.jpg" },
  { id: "p80", title: "Seed of Faith — 80 Sacred Prayers", description: "The complete edition: eighty prayers, Psalms commentary and a printable prayer tracker.", price: 100, plan: "100", cover: "/images/faith-cover-altar.jpg" },
];
