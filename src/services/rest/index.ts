import { DiscoverRestService } from "./discover_rest.service";
import { DetailRestService } from "./detail_rest.service";
import { SearchRestService } from "./search_rest.service";

export const discoverRestService = new DiscoverRestService();
export const detailRestService = new DetailRestService();
export const searchRestService = new SearchRestService();