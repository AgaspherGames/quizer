const imageUrl = "http://apiquizmaster.swedencentral.cloudapp.azure.com:9000/";

export type ImageBuckets = "avatars" | "quizzes" | "questions";

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const getFileLink = (
  file: string | undefined,
  bucket: ImageBuckets
): string => {
  return file ? `${imageUrl}${bucket}/${file}` : "/images/_default.png";
};
