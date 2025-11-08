// User and Profile Icons
import Person from "@assets/icons/person.svg";
import Profile from "@assets/icons/profile.svg";
import ContactUs from "@assets/icons/contact-us.svg";

// Calendar and Navigation
import CalendarArrowLeft from "@assets/icons/calendar-arrow-left.svg";
import CalendarArrowRight from "@assets/icons/calendar-arrow-right.svg";
import LeftArrow from "@assets/icons/left-arrow.svg";
import RightArrow from "@assets/icons/right-arrow.svg";

// Utility
import CircleFilled from "@assets/icons/circle-filled.svg";
import X from "@assets/icons/x.svg";
import Search from "@assets/icons/search.svg";
import Filters from "@assets/icons/filters.svg";
import Separator from "@assets/icons/separator.svg";

// Content
import Exercise from "@assets/icons/excercise.svg";
import Faqs from "@assets/icons/faqs.svg";
import Report from "@assets/icons/report.svg";

export const Icons = {
    CalendarArrowLeft,
    CalendarArrowRight,
    LeftArrow,
    RightArrow,
    Person,
    Profile,
    ContactUs,
    CircleFilled,
    Close: X,
    Search,
    Filters,
    Separator,
    Exercise,
    FAQs: Faqs,
    Report,
} as const;

export type IconName = keyof typeof Icons;
export type IconComponentType = (typeof Icons)[IconName];
