import { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Intercept paths like: /share/424586
  const match = url.pathname.match(/^\/share\/(\d+)$/);
  if (match) {
    const count = parseInt(match[1], 10);
    const formattedCount = new Intl.NumberFormat('pt-BR').format(count);
    
    // Fetch the original response (which is the index.html from Netlify)
    const response = await context.next();
    const html = await response.text();
    
    // Custom metadata based on the shared count
    const title = `Vidas Masculinas | ${formattedCount} mortes no Brasil`;
    const desc = `${formattedCount} homens morreram no Brasil por causas evitáveis, acidentes e violência este ano. Veja o contador em tempo real.`;
    
    let modifiedHtml = html;
    
    // Replace <title>
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    
    // Replace og:title
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${title}" />`
    );
    
    // Replace og:description
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${desc}" />`
    );
    
    // Replace twitter:title
    modifiedHtml = modifiedHtml.replace(
      /<meta property="twitter:title" content=".*?" \/>/,
      `<meta property="twitter:title" content="${title}" />`
    );
    
    // Replace twitter:description
    modifiedHtml = modifiedHtml.replace(
      /<meta property="twitter:description" content=".*?" \/>/,
      `<meta property="twitter:description" content="${desc}" />`
    );
    
    return new Response(modifiedHtml, {
      headers: response.headers,
    });
  }
  
  return context.next();
};
