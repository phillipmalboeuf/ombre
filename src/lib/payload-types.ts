/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "seasons".
 */
export interface Season {
  name?: string;
  id: string;
  start_date: string;
  end_date: string;
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "producers".
 */
export interface Producer {
  id: string;
  name?: string;
  admin?: boolean;
  payment_provider_id?: string;
  website?: string;
  phone?: string;
  shipping_address?: string;
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  title?: string;
  id: string;
  price: number;
  inventory?: number;
  unit: string;
  sizes: {
    title?: string;
    size: number;
    adjustment: number;
    id?: string;
  }[];
  seasons?: string[] | Season[];
  thumbnail?: string | Upload;
  uploads: {
    upload?: string | Upload;
    id?: string;
  }[];
  description?: {
    [k: string]: unknown;
  }[];
  publishedDate?: string;
  status?: 'draft' | 'published' | 'archived';
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "uploads".
 */
export interface Upload {
  id: string;
  title?: string;
  caption?: {
    [k: string]: unknown;
  }[];
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "bundles".
 */
export interface Bundle {
  title?: string;
  id: string;
  adjustment?: number;
  products: {
    product: string | Product;
    size: number;
    quantity: number;
    id?: string;
  }[];
  seasons?: string[] | Season[];
  thumbnail?: string | Upload;
  uploads: {
    upload?: string | Upload;
    id?: string;
  }[];
  description?: {
    [k: string]: unknown;
  }[];
  publishedDate?: string;
  status?: 'draft' | 'published' | 'archived';
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "collections".
 */
export interface Collection {
  title?: string;
  id: string;
  products?:
    | (
        | {
            value: string;
            relationTo: 'products';
          }
        | {
            value: string;
            relationTo: 'bundles';
          }
      )[]
    | (
        | {
            value: Product;
            relationTo: 'products';
          }
        | {
            value: Bundle;
            relationTo: 'bundles';
          }
      )[];
  seasons?: string[] | Season[];
  thumbnail?: string | Upload;
  description?: {
    [k: string]: unknown;
  }[];
  publishedDate?: string;
  status?: 'draft' | 'published' | 'archived';
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customers".
 */
export interface Customer {
  payment_provider_id?: string;
  id: string;
  name?: string;
  phone?: string;
  shipping_address?: string;
  kiosk?: string | Kiosk;
  status?: 'active' | 'archived';
  perks?: string[] | Perk[];
  accepts_notices?: 'never' | 'week' | 'month';
  notes?: {
    [k: string]: unknown;
  }[];
  producer?: string | Producer;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "kiosks".
 */
export interface Kiosk {
  name?: string;
  id: string;
  address?: string;
  open_hours: {
    description?: string;
    weekdays?: ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[];
    open_hour?: string;
    close_hour?: string;
    id?: string;
  }[];
  minimum_order_days?: number;
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "perks".
 */
export interface Perk {
  title?: string;
  id: string;
  description?: string;
  all_customers?: boolean;
  type?: 'subscription' | 'order_units' | 'code';
  unit: {
    unit?: string;
    unit_number?: number;
  };
  discount: {
    amount?: number;
    percentage?: boolean;
  };
  status?: 'draft' | 'published' | 'archived';
  season?: string | Season;
  producer?: string | Producer;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  payment_provider_id?: string;
  season?: string | Season;
  placed_by?:
    | {
        value: string | Customer;
        relationTo: 'customers';
      }
    | {
        value: string | Producer;
        relationTo: 'producers';
      };
  shipping_address?: string;
  kiosk?: string | Kiosk;
  deliver_at?: string;
  line_items: {
    description?: string;
    product?: string | Product;
    size?: number;
    unit?: string;
    quantity?: number;
    total?: number;
    id?: string;
  }[];
  subscription?: string | Subscription;
  notes?: {
    [k: string]: unknown;
  }[];
  status?: 'processing' | 'cancelled' | 'fulfilled';
  total?: number;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscriptions".
 */
export interface Subscription {
  id: string;
  payment_provider_id?: string;
  season?: string | Season;
  placed_by?:
    | {
        value: string | Customer;
        relationTo: 'customers';
      }
    | {
        value: string | Producer;
        relationTo: 'producers';
      };
  shipping_address?: string;
  line_items: {
    description?: string;
    product?: string | Product;
    size?: number;
    quantity?: number;
    id?: string;
  }[];
  schedule: {
    start_date: string;
    end_date?: string;
    interval: 'week' | 'month' | 'year';
    interval_count: number;
  };
  notes?: {
    [k: string]: unknown;
  }[];
  status?: 'active' | 'cancelled';
  total?: number;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "content_pages".
 */
export interface ContentPage {
  title?: string;
  id: string;
  publishedDate?: string;
  index?: boolean;
  seasons?: string[] | Season[];
  content: (
    | {
        title?: string;
        id?: string;
        media?: string | Upload;
        text?: {
          [k: string]: unknown;
        }[];
        blockName?: string;
        blockType: 'Text';
      }
    | {
        cta?: string;
        link?: string;
        id?: string;
        blockName?: string;
        blockType: 'Button';
      }
  )[];
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notices".
 */
export interface Notice {
  title?: string;
  id: string;
  event?: 'create-customers' | 'create-orders' | 'create-subscriptions';
  publishedDate?: string;
  seasons?: string[] | Season[];
  subject?: string;
  content?: {
    [k: string]: unknown;
  }[];
  status?: 'draft' | 'published' | 'archived';
  producer?: string | Producer;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "history_tasks".
 */
export interface HistoryTask {
  id: string;
  description?: string;
  task: string;
  count?: number;
  product?: string | Product;
  date: string;
  season?: string | Season;
  notes?: {
    [k: string]: unknown;
  }[];
  createdAt: string;
  updatedAt: string;
}
