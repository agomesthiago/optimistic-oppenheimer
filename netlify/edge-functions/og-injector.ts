import { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const origin = url.origin;
  
  // Filter out static assets
  const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|txt|xml|json)$/i.test(url.pathname);
  
  if (!isAsset) {
    // Fetch the original response (which is the index.html from Netlify)
    const response = await context.next();
    const html = await response.text();
    
    let modifiedHtml = html;
    
    // Dynamically replace the domain in metadata to match the current origin (essential for working preview images)
    modifiedHtml = modifiedHtml.replace(/https:\/\/vidasmasculinas\.netlify\.app/g, origin);
    
    // Intercept paths like: /share/424586
    const match = url.pathname.match(/^\/share\/(\d+)$/);
    if (match) {
      const count = parseInt(match[1], 10);
      const formattedCount = new Intl.NumberFormat('pt-BR').format(count);
      
      // Custom metadata based on the shared count
      const title = `Vidas Masculinas | ${formattedCount} mortes no Brasil`;
      const desc = `${formattedCount} homens morreram no Brasil por causas evitáveis, acidentes e violência este ano. Veja o contador em tempo real.`;
      
      // Replace <title>
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      
      // Replace og:title
      modifiedHtml = modifiedHtml.replace(
        /<meta property="og:title" content=".*?"\s*\/?>/,
        `<meta property="og:title" content="${title}" />`
      );
      
      // Replace og:description
      modifiedHtml = modifiedHtml.replace(
        /<meta property="og:description" content=".*?"\s*\/?>/,
        `<meta property="og:description" content="${desc}" />`
      );
      
      // Replace twitter:title
      modifiedHtml = modifiedHtml.replace(
        /<meta property="twitter:title" content=".*?"\s*\/?>/,
        `<meta property="twitter:title" content="${title}" />`
      );
      
      // Replace twitter:description
      modifiedHtml = modifiedHtml.replace(
        /<meta property="twitter:description" content=".*?"\s*\/?>/,
        `<meta property="twitter:description" content="${desc}" />`
      );
    }
    
    return new Response(modifiedHtml, {
      headers: response.headers,
    });
  }
  
  return context.next();
};
