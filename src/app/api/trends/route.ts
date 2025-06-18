import { NextRequest, NextResponse } from 'next/server';
import { stripHTML, searchByKeyWord, BlogPostSummary } from './utilities';


export async function GET(request: NextRequest) {


  const url = "https://bergvik.se/wp-json/wp/v2/posts?per_page=100";

  const searchParams = request.nextUrl.searchParams;

  const limitParam = searchParams.get('limit');
  const keyWordParamRaw = searchParams.get('search');
  const keyWordParam = keyWordParamRaw ? keyWordParamRaw.toUpperCase() : '';
  const limitValue = limitParam !== null ? Number(limitParam) : 10;


  //console.log('limitParam:', limitParam);
  //console.log('limiParam:', keyWordParam);

  if (!Number.isInteger(limitValue)) {
    return NextResponse.json(
      { error: 'Limit parameter must be an integer' },
      { status: 400 }
    );
  }

  if (limitValue < 1 || limitValue > 100) {
    return NextResponse.json(
      { error: 'Limit parameter must be between 1 and 100' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch posts, status: ${response.status}` },
        { status: response.status }
      );
    }

    const posts = await response.json();
    
    const cleanedPosts: BlogPostSummary[] = posts.map((post: any) => {
      const rawTitle = post.title?.rendered ?? '';
      const title = stripHTML(rawTitle);
      const rawExcerpt = post.excerpt?.rendered ?? '';
      const excerpt = stripHTML(rawExcerpt);
      const link = post.link ? post.link : '';
      const date = post.date ? post.date : '';

      return { title, excerpt, link, date };
    });


    
    let resultPosts = searchByKeyWord(cleanedPosts, keyWordParam);
    return NextResponse.json(resultPosts.slice(0, limitValue));


  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
