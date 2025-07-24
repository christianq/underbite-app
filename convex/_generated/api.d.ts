/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as carts from "../carts.js";
import type * as categories from "../categories.js";
import type * as items from "../items.js";
import type * as orders from "../orders.js";
import type * as sandwiches from "../sandwiches.js";
import type * as seed from "../seed.js";
import type * as settings from "../settings.js";
import type * as stripe from "../stripe.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  carts: typeof carts;
  categories: typeof categories;
  items: typeof items;
  orders: typeof orders;
  sandwiches: typeof sandwiches;
  seed: typeof seed;
  settings: typeof settings;
  stripe: typeof stripe;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
