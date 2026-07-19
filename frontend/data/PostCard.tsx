import { Post } from "@/types";


export const TABS: string[] = ["Queue", "Published", "Pending", "Drafts"];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Weekend Sale",
    status: "Queue",
    scheduledLabel: "2 hours time",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80",
    platforms: ["instagram", "facebook", "x"],
    extraPlatformCount: 2,
  },
  {
    id: "2",
    title: "New Arrivals",
    status: "Queue",
    scheduledLabel: "Today 2:30am",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
    platforms: ["instagram", "facebook", "x"],
    extraPlatformCount: 2,
  },
  {
    id: "3",
    title: "Flash Deal",
    status: "Published",
    scheduledLabel: "Today 5:00pm",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-610cd07b8f2c?w=600&q=80",
    platforms: ["instagram", "facebook", "x"],
    extraPlatformCount: 2,
  },
  {
    id: "4",
    title: "Summer Collection",
    status: "Queue",
    scheduledLabel: "Tomorrow 9:00am",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    platforms: ["instagram", "x"],
    extraPlatformCount: 1,
  },
  {
    id: "5",
    title: "Behind the Scenes",
    status: "Published",
    scheduledLabel: "Yesterday 3:15pm",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600&q=80",
    platforms: ["instagram", "facebook"],
    extraPlatformCount: 0,
  },
  {
    id: "6",
    title: "Customer Spotlight",
    status: "Published",
    scheduledLabel: "2 days ago",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    platforms: ["facebook", "x"],
    extraPlatformCount: 1,
  },
  {
    id: "7",
    title: "Holiday Teaser",
    status: "Pending",
    scheduledLabel: "Awaiting approval",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&q=80",
    platforms: ["instagram", "facebook", "x"],
    extraPlatformCount: 3,
  },
  {
    id: "8",
    title: "Product Launch",
    status: "Pending",
    scheduledLabel: "Awaiting approval",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    platforms: ["instagram"],
    extraPlatformCount: 0,
  },
  {
    id: "9",
    title: "Team Announcement",
    status: "Pending",
    scheduledLabel: "Awaiting approval",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    platforms: ["facebook", "x"],
    extraPlatformCount: 2,
  },
  {
    id: "10",
    title: "Client Testimonial",
    status: "Drafts",
    scheduledLabel: "Not scheduled",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    platforms: ["instagram", "facebook"],
    extraPlatformCount: 1,
  },
  {
    id: "11",
    title: "Event Recap",
    status: "Drafts",
    scheduledLabel: "Not scheduled",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    platforms: ["x"],
    extraPlatformCount: 0,
  },
  {
    id: "12",
    title: "Weekly Tips",
    status: "Drafts",
    scheduledLabel: "Not scheduled",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80",
    platforms: ["instagram", "facebook", "x"],
    extraPlatformCount: 2,
  },
  {
    id: "13",
    title: "Q&A Session",
    status: "Queue",
    scheduledLabel: "In 3 hours",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1553484771-11998c592b9c?w=600&q=80",
    platforms: ["instagram", "x"],
    extraPlatformCount: 1,
  },
  {
    id: "14",
    title: "Milestone Celebration",
    status: "Published",
    scheduledLabel: "3 days ago",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    platforms: ["facebook"],
    extraPlatformCount: 0,
  },
  {
    id: "15",
    title: "Behind the Brand",
    status: "Pending",
    scheduledLabel: "Awaiting approval",
    description:
      "Exciting news, get ready to enjoy the ease of content management with our exciting tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    platforms: ["instagram", "facebook", "x"],
    extraPlatformCount: 2,
  },
];