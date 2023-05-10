import { combineReducers } from "redux";
import { AuthReducer } from "./reducers/AuthReducer";
import { UserReducer } from "./reducers/UserReducer";
import { CategoryReducer } from "./reducers/CategoryReducer";
import { ProductsReducer } from "./reducers/ProductsReducer";
import { SellerReducer } from "./reducers/SellerReducer";
import { PartnersCategoryReducer } from "./reducers/PartnersCategoryReducer";
import { PartnersReducer } from "./reducers/PartnersReducer";
import { PodcastsReducer } from "./reducers/PodcastsReducer";
import { AudioInstanceReducer } from "./reducers/AudioInstanceReducer";
import { ArticleReducer } from "./reducers/ArticleReducer";
import { GradesReducer } from "./reducers/GradesReducer";
import { LocationReducer } from "./reducers/LocationReducer";
import { VideoInstanceReducer } from "./reducers/VideoInstanceReducer";
import { UserDataReducer } from "./reducers/UserDataReducer";
import { ContactsReducer } from "./reducers/ContactsReducer";
import { BascketReducer } from "./reducers/BascketReducer";
import { SuccessPaymentsReducer } from "./reducers/SuccessPaymentsReducer";
import { MainPaigeReducer } from "./reducers/MainPaigeReducer";
import { GastronomyReducer } from "./reducers/GastronomyReducer";
import { EventsReducer } from "./reducers/EventsReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  categories: CategoryReducer,
  partnersCategories: PartnersCategoryReducer,
  products: ProductsReducer,
  shop: SellerReducer,
  partners: PartnersReducer,
  podcasts: PodcastsReducer,
  currentAudio: AudioInstanceReducer,
  articles: ArticleReducer,
  grades: GradesReducer,
  location: LocationReducer,
  video: VideoInstanceReducer,
  personal_info: UserDataReducer,
  contacts: ContactsReducer,
  bascket: BascketReducer,
  payments: SuccessPaymentsReducer,
  main_page: MainPaigeReducer,
  gastronomy_id: GastronomyReducer,
  events: EventsReducer,
});
