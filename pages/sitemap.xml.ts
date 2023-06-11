import { NextApiResponse } from "next";
import BLOG from "../BLOG.config";
import Article from "../models/article";
import dbConnect from "../utils/db";

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = BLOG.link;

function generateSiteMap(posts: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>>${EXTERNAL_DATA_URL}</loc>
     </url>
     <url>
       <loc>>${`${EXTERNAL_DATA_URL}/search`}</loc>
     </url>
     <url>
       <loc>>${`${EXTERNAL_DATA_URL}/contact`}</loc>
     </url>
     ${posts
       .map(({ slug }: { slug: string }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  await dbConnect();

  // We make an API call to gather the URLs for our site
  const posts = await Article.find({});
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
