import type { GatsbyBrowser } from "gatsby";
import { wrapPageElement as sharedWrapPageElement } from "./src/gatsby-shared";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] =
  sharedWrapPageElement;
