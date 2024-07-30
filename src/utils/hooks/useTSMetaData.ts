import DOMPurify from "dompurify";
import { useTSCSP } from "./useTSCSP";

interface SEOConfig {
  name?: string;
  description?: string;
  author?: string;
}

interface CSPConfig {
  scriptSrc?: string;
  styleSrc?: string;
  objectSrc?: string;
  connectSrc?: string[];
  reportOnly?: boolean;
}

interface SEOHandler {
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setAuthor: (author: string) => void;
  getName: () => string;
  getDescription: () => string;
  getAuthor: () => string;
  getAllMetaData: () => SEOConfig;
  appendMetaTagsToHead: () => void;
}

export const useTSMetaData = (
  config: SEOConfig,
  cspConfig?: CSPConfig
): SEOHandler => {
  let metaData: SEOConfig = {
    name: DOMPurify.sanitize(config.name || ""),
    description: DOMPurify.sanitize(
      config.description || "Default description"
    ),
    author: DOMPurify.sanitize(config.author || ""),
  };

  const setName = (name: string): void => {
    metaData.name = DOMPurify.sanitize(name);
    updateMetaTag("name", metaData.name);
  };

  const setDescription = (description: string): void => {
    metaData.description = DOMPurify.sanitize(description);
    updateMetaTag("description", metaData.description);
  };

  const setAuthor = (author: string): void => {
    metaData.author = DOMPurify.sanitize(author);
    updateMetaTag("author", metaData.author);
  };

  const getName = (): string => {
    return metaData.name!;
  };

  const getDescription = (): string => {
    return metaData.description!;
  };

  const getAuthor = (): string => {
    return metaData.author!;
  };

  const getAllMetaData = (): SEOConfig => {
    return metaData;
  };

  const createMetaTag = (name: string, content: string) => {
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    metaTag.setAttribute("content", content);
    document.head.appendChild(metaTag);
  };

  const updateMetaTag = (name: string, content: string) => {
    let metaTag = document.querySelector(`meta[name="${name}"]`);
    if (metaTag) {
      metaTag.setAttribute("content", content);
    } else {
      createMetaTag(name, content);
    }
  };

  const appendMetaTagsToHead = () => {
    updateMetaTag("name", metaData.name!);
    updateMetaTag("description", metaData.description!);
    updateMetaTag("author", metaData.author!);
  };

  // Integrate with useTSCSP for CSP enforcement
  if (cspConfig) {
    useTSCSP(
      cspConfig.scriptSrc,
      cspConfig.styleSrc,
      cspConfig.objectSrc,
      cspConfig.connectSrc,
      cspConfig.reportOnly
    );
  }

  appendMetaTagsToHead();

  return {
    setName,
    setDescription,
    setAuthor,
    getName,
    getDescription,
    getAuthor,
    getAllMetaData,
    appendMetaTagsToHead,
  };
};
