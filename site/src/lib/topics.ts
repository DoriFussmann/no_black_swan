/**
 * Topic hubs: one page per core keyword. `name` must match articles' pillarKeyword exactly.
 * Empty until No Black Swan topics are defined with the content/SEO work.
 */
export const TOPICS = [] as const satisfies readonly {
  name: string;
  slug: string;
  pillar: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
}[];

export type Topic = (typeof TOPICS)[number];

export function topicByName(name: string | undefined): Topic | undefined {
  if (!name) return undefined;
  return TOPICS.find((topic) => topic.name === name.trim());
}
