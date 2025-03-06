export interface NewsSource {
  name: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: NewsSource;
  publishedAt: string;
  author: string;
}

export interface GuardianArticle {
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields: {
    trailText: string;
    thumbnail: string;
  };
}
