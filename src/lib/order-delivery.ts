/** Maps a purchased item (from the thank-you URL) to its downloadable guide. Public, no login. */
export interface DeliveryItem { title: string; pdf: string }

const ITEMS: Record<string, DeliveryItem> = {
  "27": { title: "Faith Activation – 20 Daily Prayers", pdf: "The-20-Sacred-Prayers-Archangel-Michael.pdf" },
  "47": { title: "Faith Activation – 40 Daily Prayers", pdf: "The-40-Sacred-Prayers-Archangel-Michael.pdf" },
  "77": { title: "Faith Activation – 60 Daily Prayers", pdf: "The-60-Sacred-Prayers-Archangel-Michael.pdf" },
  "100": { title: "Faith Activation – 80 Daily Prayers", pdf: "The-80-Sacred-Prayers-Archangel-Michael.pdf" },
  activation: { title: "90-Day Faith Activation Plan", pdf: "90-Day-Faith-Activation-Plan.pdf" },
  protection: { title: "Faith Protection Prayers", pdf: "The-7-Holy-Seals-Family-Prayer-Study.pdf" },
};

export function deliveryFor(item: string | null | undefined): DeliveryItem {
  return ITEMS[item ?? ""] ?? ITEMS["27"]!;
}
