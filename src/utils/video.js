export const getVideoId = (url) => {
  const urlParams = new URL(url);
  return urlParams.searchParams.get('v');
};
export const getEmbedUrlYoutube = (url) => {
  const videoId = getVideoId(url);
  return `https://www.youtube.com/embed/${videoId}`;
};