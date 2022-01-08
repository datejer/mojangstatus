import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      "status-indicator": any;
    }
  }
}
